'use server'

import { VisitorPermissionException } from '@/lib/exceptions/VisitorPermissionException'
import {
  CreateGroupFormState,
  CreateGroupSchema,
  DeleteGroupFormState,
  DeleteGroupSchema,
  SearchGroupFormState,
  SearchGroupSchema,
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
        description: parsed.data.description ?? '',
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

  redirect('/grupo')
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
  redirect('/grupo')
}

export async function destroy(
  formState: DeleteGroupFormState,
  formData: FormData,
): Promise<DeleteGroupFormState> {
  const parsed = DeleteGroupSchema.safeParse({
    confirmGroupName: formData.get('confirmGroupName'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    const session = await actions.session.get(true)

    const group = await prisma.group.findUnique({
      where: { id: session.groupId },
    })

    if (!group) {
      return { errors: { _form: 'Grupo não encontrado' } }
    }

    if (parsed.data.confirmGroupName !== group.name) {
      return {
        errors: {
          confirmGroupName: [
            'O nome informado não corresponde ao nome do grupo',
          ],
        },
      }
    }

    await prisma.transaction.deleteMany({ where: { groupId: group.id } })
    await prisma.goal.deleteMany({ where: { groupId: group.id } })
    await prisma.invitation.deleteMany({ where: { groupId: group.id } })
    await prisma.category.deleteMany({ where: { groupId: group.id } })

    await actions.session.set({
      id: session.id,
      name: session.name,
      username: session.username,
      groupId: undefined,
    })
  } catch (error) {
    if (error instanceof VisitorPermissionException) {
      throw error
    }

    return { errors: { _form: 'Erro ao deletar o grupo' } }
  }

  revalidatePath('/')
  return { success: true, errors: {} }
}

export async function list(
  formState: SearchGroupFormState,
  formData: FormData,
): Promise<SearchGroupFormState> {
  const parsed = SearchGroupSchema.safeParse({
    search: formData.get('search'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    const groups = await prisma.group.findMany({
      where: {
        allowFindMe: true,
        OR: [
          { name: { contains: parsed.data.search, mode: 'insensitive' } },
          { tag: { contains: parsed.data.search, mode: 'insensitive' } },
        ],
      },
      orderBy: { name: 'asc' },
      include: {
        creator: {
          select: { name: true },
        },
        _count: {
          select: {
            users: true,
          },
        },
      },
    })

    return { data: groups, errors: {} }
  } catch {
    return { errors: { _form: 'Erro ao listar os grupos' } }
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

export async function getMembers() {
  try {
    const session = await actions.session.get(true)

    if (!session?.groupId) {
      return {
        error: true,
        message: 'Usuário não está em um grupo',
        members: [],
      }
    }

    const members = await prisma.group.findUnique({
      where: { id: session.groupId },
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

export async function getInvitations() {
  try {
    const session = await actions.session.get(true)

    if (!session?.groupId) {
      return {
        error: true,
        message: 'Usuário não está em um grupo',
        invitations: [],
      }
    }

    const invitations = await prisma.invitation.findMany({
      where: { groupId: session.groupId, status: 'PENDING' },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
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

export async function handleRequest(
  invitationId: string,
  status: 'ACCEPTED' | 'REJECTED',
) {
  try {
    const invitation = await prisma.invitation.update({
      where: { id: invitationId },
      data: { status },
    })

    if (status === 'ACCEPTED') {
      await prisma.group.update({
        where: { id: invitation.groupId },
        data: { users: { connect: { id: invitation.userId } } },
      })
    }
  } catch {
    return {
      error: true,
      message:
        status === 'ACCEPTED'
          ? 'Erro ao aceitar a solicitação'
          : 'Erro ao rejeitar a solicitação',
    }
  }

  revalidatePath('/grupo')

  return {
    error: false,
    message:
      status === 'ACCEPTED'
        ? 'Solicitação aceita com sucesso'
        : 'Solicitação rejeitada com sucesso',
  }
}

export async function sendInvitation(groupId: string) {
  try {
    const session = await actions.session.get(true)

    const alreadySent = await prisma.invitation.findFirst({
      where: { groupId, userId: session.id, status: 'PENDING' },
    })

    if (alreadySent) {
      throw new Error('Um convite já foi enviado para este grupo')
    }

    await prisma.invitation.create({
      data: { groupId, userId: session.id },
    })

    return {
      error: false,
      message: 'Usuário convidado com sucesso',
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }

    throw new Error('Erro ao enviar o convite')
  }
}

export async function removeParticipant(groupId: string, userId: string) {
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
  } catch {
    return {
      error: true,
      message: 'Erro ao remover o participante do grupo',
    }
  }

  revalidatePath('/grupo')
  return {
    error: false,
    message: 'Participante removido com sucesso',
  }
}

export async function leave() {
  try {
    const session = await actions.session.get(true)

    await prisma.group.update({
      where: { id: session.groupId },
      data: { users: { disconnect: { id: session.id } } },
    })

    await actions.session.set({
      id: session.id,
      name: session.name,
      username: session.username,
      groupId: undefined,
    })
  } catch {
    return {
      error: true,
      message: 'Erro ao sair do grupo',
    }
  }

  revalidatePath('/')
  redirect('/grupo')
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

export async function getBalance() {
  const session = await actions.session.get()
  if (!session?.groupId) {
    return 0
  }

  const res = await prisma.group.findUnique({
    where: { id: session.groupId, users: { some: { id: session.id } } },
    select: { balance: true },
  })

  return res?.balance ?? 0
}
