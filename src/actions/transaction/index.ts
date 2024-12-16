'use server'

import {
  TransactionFormState,
  TransactionSchema,
} from '@/lib/form-handlers/transactions'
import prisma from '@/lib/prisma'

import { ActionResponse, TransactionsPaginated } from '@/lib/types'
import { $Enums, Transaction } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { actions } from '..'

interface GetAllParams {
  page?: number
  limit?: number
  type?: $Enums.TypeTransaction
  status?: $Enums.StatusTransaction
  to?: Date
  from?: Date
  greaterThan?: number
  lessThan?: number
  categoryId?: string
  description?: string
}

export async function getAll(
  params: GetAllParams,
): Promise<ActionResponse<TransactionsPaginated | null>> {
  try {
    const session = await actions.session.get()
    if (!session) {
      return {
        error: true,
        message: 'Sessão não encontrada',
        data: null,
      }
    }

    if (!params.page) params.page = 1
    if (!params.limit) params.limit = 10

    let initialDate: { month: number; year: number } | undefined
    if (params.from) {
      initialDate = {
        month: params.from.getMonth() + 1,
        year: params.from.getFullYear(),
      }
    }

    let finalDate: { month: number; year: number } | undefined
    if (params.to) {
      finalDate = {
        month: params.to.getMonth() + 1,
        year: params.to.getFullYear(),
      }
    }

    const transactions = await prisma.transaction.findMany({
      where: {
        groupId: session.groupId,
        ...(params.type && { type: params.type }),
        ...(params.status && { status: params.status }),
        ...(initialDate && {
          month: { gte: initialDate.month },
          year: { gte: initialDate.year },
        }),
        ...(finalDate && {
          month: { lte: finalDate.month },
          year: { lte: finalDate.year },
        }),
        ...(params.greaterThan && { amount: { gte: params.greaterThan } }),
        ...(params.lessThan && { amount: { lte: params.lessThan } }),
        ...(params.categoryId && { categoryId: params.categoryId }),
        ...(params.description && {
          description: { contains: params.description, mode: 'insensitive' },
        }),
      },
      include: {
        category: true,
      },
      orderBy: {
        description: 'asc',
      },
      skip: (params.page - 1) * params.limit,
      take: params.limit,
    })

    const totalTransactions = await prisma.transaction.count({
      where: {
        groupId: session.groupId,
      },
    })

    const totalPages = Math.ceil(totalTransactions / params.limit)

    return {
      error: false,
      message: 'Transações encontradas com sucesso',
      data: {
        currentPage: params.page,
        nextPage: params.page + 1 > totalPages ? null : params.page + 1,
        previousPage: params.page - 1 < 1 ? null : params.page - 1,
        totalPages,
        totalTransactions,
        transactions,
      },
    }
  } catch {
    return {
      error: true,
      message: 'Falha ao buscar transações',
      data: null,
    }
  }
}

export async function getById(
  transactionId: string,
): Promise<ActionResponse<Transaction | null>> {
  try {
    const session = await actions.session.get()
    if (!session) {
      return {
        error: true,
        message: 'Sessão não encontrada',
        data: null,
      }
    }

    const transaction = await prisma.transaction.findUnique({
      where: {
        id: transactionId,
        groupId: session.groupId,
      },
    })

    if (!transaction) {
      return {
        error: true,
        message: 'Transação não encontrada',
        data: null,
      }
    }

    return {
      error: false,
      message: 'Transação encontrada com sucesso',
      data: transaction,
    }
  } catch {
    return {
      error: true,
      message: 'Falha ao buscar transação',
      data: null,
    }
  }
}

export async function save(
  formState: TransactionFormState,
  formData: FormData,
): Promise<TransactionFormState> {
  const parsed = TransactionSchema.safeParse({
    id: formData.get('id'),
    description: formData.get('description'),
    amount: formData.get('amount'),
    month: formData.get('month'),
    year: formData.get('year'),
    type: formData.get('type'),
    categoryId: formData.get('categoryId'),
    status: formData.get('status'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  const session = await actions.session.get(true)

  if (!session?.groupId) {
    return { errors: { _form: 'Grupo não encontrado' } }
  }

  const path = parsed.data.type === 'EXPENSE' ? '/despesa' : '/receita'

  try {
    if (parsed.data.id) {
      await update(formData, parsed.data.id, session.groupId)
    } else {
      await create(formData, session.groupId)
    }
  } catch (error) {
    return {
      errors: {
        _form: 'Erro ao salvar transação',
      },
    }
  }

  revalidatePath(path)
  redirect(path)
}

export async function create(formData: FormData, groupId: string) {
  try {
    const parsed = TransactionSchema.safeParse(Object.fromEntries(formData))
    if (!parsed.success) {
      return { errors: parsed.error.flatten().fieldErrors }
    }

    await prisma.transaction.create({
      data: {
        description: parsed.data.description,
        amount: parsed.data.amount,
        month: parsed.data.month,
        year: parsed.data.year,
        categoryId: parsed.data.categoryId,
        status: parsed.data.status as $Enums.StatusTransaction,
        type: parsed.data.type as $Enums.TypeTransaction,
        uuid: crypto.randomUUID(),
        groupId,
      },
    })

    return { errors: {} }
  } catch {
    return {
      errors: {
        _form: 'Falha ao criar transação',
      },
    }
  }
}

export async function update(
  formData: FormData,
  transactionId: string,
  groupId: string,
) {
  try {
    const parsed = TransactionSchema.safeParse(Object.fromEntries(formData))
    if (!parsed.success) {
      return { errors: parsed.error.flatten().fieldErrors }
    }

    await prisma.transaction.update({
      where: {
        id: transactionId,
        groupId,
      },
      data: {
        description: parsed.data.description,
        amount: parsed.data.amount,
        month: parsed.data.month,
        year: parsed.data.year,
        categoryId: parsed.data.categoryId,
      },
    })

    return { errors: {} }
  } catch {
    return {
      errors: {
        _form: 'Falha ao atualizar transação',
      },
    }
  }
}

export async function remove(
  transactionId: string,
): Promise<ActionResponse<Transaction | null>> {
  try {
    const session = await actions.session.get(true)

    const transactionExists = await prisma.transaction.findUnique({
      where: {
        id: transactionId,
        groupId: session.groupId,
      },
    })

    if (!transactionExists) {
      return {
        error: true,
        message: 'Transação não encontrada',
        data: null,
      }
    }

    const transaction = await prisma.transaction.delete({
      where: {
        id: transactionId,
        groupId: session.groupId,
      },
    })

    return {
      error: false,
      message: 'Transação deletada com sucesso',
      data: transaction,
    }
  } catch {
    return {
      error: true,
      message: 'Falha ao deletar transação',
      data: null,
    }
  }
}

export async function setStatus(
  transactionIds: string[],
  status: $Enums.StatusTransaction,
) {
  try {
    const session = await actions.session.get(true)
    if (!session?.groupId) {
      return { errors: { _form: 'Grupo não encontrado' } }
    }

    const res = await prisma.transaction.updateMany({
      where: { id: { in: transactionIds }, groupId: session.groupId },
      data: { status },
    })

    if (res.count === 0) {
      return { success: false, message: 'Nenhuma transação encontrada' }
    }

    return setBalance(session.groupId)
  } catch {
    return {
      success: false,
      message: 'Falha ao atualizar status das transações',
    }
  }
}

async function setBalance(groupId: string) {
  const [totalIncomes, totalExpenses] = await Promise.all([
    getTotalIncomes(groupId),
    getTotalExpenses(groupId),
  ])

  const balance = totalIncomes - totalExpenses

  return prisma.group.update({
    where: {
      id: groupId,
    },
    data: { balance },
  })
}

async function getTotalIncomes(groupId: string) {
  const incomes = await prisma.transaction.aggregate({
    where: {
      groupId,
      type: 'INCOME',
      status: 'OK',
    },
    _sum: {
      amount: true,
    },
  })

  return incomes._sum.amount || 0
}

async function getTotalExpenses(groupId: string) {
  const expenses = await prisma.transaction.aggregate({
    where: {
      groupId,
      type: 'EXPENSE',
      status: 'OK',
    },
    _sum: {
      amount: true,
    },
  })

  return expenses._sum.amount || 0
}
