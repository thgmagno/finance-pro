'use server'

import {
  CreateGroupFormState,
  CreateGroupSchema,
} from '@/lib/form-handlers/groups'
import prisma from '@/lib/prisma'
import { SessionPayload } from '@/lib/types'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { actions } from '..'

export async function create(
  formState: CreateGroupFormState,
  formData: FormData,
): Promise<CreateGroupFormState> {
  const parsed = CreateGroupSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    const session = await actions.session.get(true)

    const tag = await generateUniqueTag()

    const group = await prisma.group.create({
      data: {
        name: parsed.data.name,
        creatorId: session.id,
        tag,
      },
    })

    await prisma.user.update({
      where: { id: session.id },
      data: { groupId: group.id },
    })

    const newPayload: SessionPayload = {
      id: session.id,
      name: session.name,
      username: session.username,
      groupId: group.id,
    }

    await actions.session.set(newPayload)
  } catch (error) {
    console.error(error)
    return { errors: { _form: 'Erro ao criar o grupo' } }
  }

  redirect('/')
}

export async function update(
  formState: CreateGroupFormState,
  formData: FormData,
): Promise<CreateGroupFormState> {
  const parsed = CreateGroupSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    const session = await actions.session.get(true)

    await prisma.group.update({
      where: { id: session.groupId },
      data: {
        name: parsed.data.name,
        description: parsed.data.description,
      },
    })
  } catch {
    return { errors: { _form: 'Erro ao atualizar o grupo' } }
  }

  revalidatePath('/')
  redirect('/configuracoes')
}

export async function destroy(groupId: string) {
  try {
    await actions.session.get(true)

    const group = await prisma.group.findUnique({
      where: { id: groupId },
    })

    if (!group) {
      return { error: true, message: 'Grupo não encontrado' }
    }

    await Promise.all([
      prisma.transaction.deleteMany({
        where: { groupId },
      }),
      prisma.goal.deleteMany({
        where: { groupId },
      }),
      prisma.invitation.deleteMany({
        where: { groupId },
      }),
      prisma.category.deleteMany({
        where: { groupId },
      }),
      prisma.group.delete({
        where: { id: groupId },
      }),
    ])
  } catch {
    return { error: true, message: 'Erro ao deletar o grupo' }
  }

  revalidatePath('/')
  return { error: false, message: 'Grupo deletado com sucesso' }
}

export async function list() {
  try {
    const groups = await prisma.group.findMany({
      orderBy: { name: 'asc' },
    })

    return { error: false, message: '', groups }
  } catch {
    return { error: true, message: 'Erro ao listar os grupos', groups: [] }
  }
}

export async function get(groupId: string) {
  try {
    const group = await prisma.group.findUnique({
      where: { id: groupId },
    })

    if (!group) {
      return { error: true, message: 'Grupo não encontrado', group: null }
    }

    return { error: false, message: '', group }
  } catch {
    return { error: true, message: 'Erro ao buscar o grupo', group: null }
  }
}

export async function getMembers(groupId: string) {
  try {
    const members = await prisma.group.findUnique({
      where: { id: groupId },
      include: {
        users: true,
      },
    })

    if (!members) {
      return { error: true, message: 'Grupo não encontrado', members: [] }
    }

    return { error: false, message: '', members: members.users }
  } catch {
    return {
      error: true,
      message: 'Erro ao buscar os membros do grupo',
      members: [],
    }
  }
}

export async function getInvitations(groupId: string) {
  try {
    const invitations = await prisma.invitation.findMany({
      where: { groupId },
    })

    return { error: false, message: '', invitations }
  } catch {
    return {
      error: true,
      message: 'Erro ao buscar as convites do grupo',
      invitations: [],
    }
  }
}

export async function requestToJoin(groupId: string) {
  try {
    const session = await actions.session.get()

    if (!session?.id) {
      return { error: true, message: 'Usuário não autenticado' }
    }

    await prisma.invitation.create({
      data: {
        groupId,
        userId: session.id,
      },
    })

    return {
      error: false,
      message: 'Solicitação enviada com sucesso',
    }
  } catch {
    return {
      error: true,
      message: 'Erro ao enviar a solicitação',
    }
  }
}

export async function acceptRequest(invitationId: string) {
  try {
    await prisma.invitation.update({
      where: { id: invitationId },
      data: { status: 'ACCEPTED' },
    })

    return {
      error: false,
      message: 'Solicitação aceita com sucesso',
    }
  } catch {
    return {
      error: true,
      message: 'Erro ao aceitar a solicitação',
    }
  }
}

export async function rejectRequest(invitationId: string) {
  try {
    await prisma.invitation.update({
      where: { id: invitationId },
      data: { status: 'REJECTED' },
    })

    return {
      error: false,
      message: 'Solicitação rejeitada com sucesso',
    }
  } catch {
    return {
      error: true,
      message: 'Erro ao rejeitar a solicitação',
    }
  }
}

export async function invite(groupId: string, userId: string) {
  try {
    await actions.session.get(true)

    await prisma.invitation.create({
      data: { groupId, userId },
    })

    return {
      error: false,
      message: 'Usuário convidado com sucesso',
    }
  } catch {
    return {
      error: true,
      message: 'Erro ao convidar o usuário',
    }
  }
}

export async function removeMember(groupId: string, userId: string) {
  try {
    const group = await prisma.group.findUnique({
      where: { id: groupId },
      include: {
        users: true,
      },
    })

    if (!group) {
      return { error: true, message: 'Grupo não encontrado' }
    }

    const isValidMember = group.users.some((user) => user.id === userId)

    if (!isValidMember) {
      return {
        error: true,
        message: 'Usuário não encontrado no grupo',
      }
    }

    await prisma.group.update({
      where: { id: groupId },
      data: { users: { disconnect: { id: userId } } },
    })

    return {
      error: false,
      message: 'Membro removido com sucesso',
    }
  } catch {
    return {
      error: true,
      message: 'Erro ao remover o membro do grupo',
    }
  }
}

export async function leave(groupId: string) {
  try {
    const session = await actions.session.get(true)

    await prisma.group.update({
      where: { id: groupId },
      data: { users: { disconnect: { id: session.id } } },
    })

    return {
      error: false,
      message: 'Você saiu do grupo com sucesso',
    }
  } catch {
    return {
      error: true,
      message: 'Erro ao sair do grupo',
    }
  }
}

export async function updateAllowFindMe(allowFindMe: boolean) {
  const session = await actions.session.get(true)

  await prisma.group.update({
    where: { id: session.groupId },
    data: { allowFindMe },
  })

  revalidatePath('/configuracoes')
}

export async function getGroupBySession() {
  const session = await actions.session.get()

  if (!session?.groupId) {
    return null
  }

  const group = await prisma.group.findUnique({
    where: { id: session.groupId },
  })

  return group
}

async function generateUniqueTag() {
  const tag = Math.random().toString(36).substring(2, 8).toUpperCase()

  const existingTag = await prisma.group.findFirst({
    where: { tag },
  })

  if (existingTag) {
    return generateUniqueTag()
  }

  return tag
}
