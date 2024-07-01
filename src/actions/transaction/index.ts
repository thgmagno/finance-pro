'use server'

import prisma from '@/lib/prisma'
import { TransactionSchema, UpdateTransactionSchema } from '@/lib/schemas'
import { TransactionFormState, UpdateTransactionFormState } from '@/lib/states'
import { StatusTransaction, Transaction } from '@/lib/types'
import { randomUUID } from 'crypto'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function create(
  formState: TransactionFormState,
  formData: FormData,
): Promise<TransactionFormState> {
  const parsed = TransactionSchema.safeParse({
    userId: formData.get('userId'),
    type: formData.get('type'),
    category: formData.get('category'),
    description: formData.get('description'),
    amount: formData.get('amount'),
    recurrency: formData.get('recurrency'),
    startMonth: formData.get('startMonth'),
    startYear: formData.get('startYear'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  const pathname = parsed.data?.type === 'EXPENSE' ? '/despesa' : '/receita'

  const uuid = randomUUID()

  try {
    const transactions = []

    for (let i = 0; i < parsed.data.recurrency; i++) {
      const date = new Date(parsed.data.startYear, parsed.data.startMonth + i)
      const month = date.getMonth()
      const year = date.getFullYear()

      transactions.push(
        prisma.transaction.create({
          data: {
            description: parsed.data.description,
            amount: parsed.data.amount,
            month,
            year,
            type: parsed.data.type,
            categoryId: parsed.data.category,
            userId: parsed.data.userId,
            uuid,
          },
        }),
      )
    }

    await Promise.all(transactions)
  } catch (err) {
    if (err instanceof Error) {
      return { errors: { _form: 'Ocorreu um erro ao salvar' } }
    }
  }

  revalidatePath('/')
  redirect(pathname)
}

export async function findMany(userId: number) {
  return prisma.transaction.findMany({
    where: { userId },
    include: { category: { select: { description: true } } },
    orderBy: [{ month: 'desc' }, { year: 'desc' }, { description: 'asc' }],
  })
}

export async function findTransactions(
  userId: number,
  month?: string,
  year?: string,
) {
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const [transactions, arrMonths, arrYears, arrCategories] = await Promise.all([
    prisma.transaction.findMany({
      where: {
        OR: [
          {
            userId,
            ...(!month && { month: currentMonth }),
            ...(!year && { year: currentYear }),
            ...(month && month !== 'todos' && { month: Number(month) - 1 }),
            ...(year && year !== 'todos' && { year: Number(year) }),
          },
          {
            userId,
            month: { lte: month ? Number(month) - 1 : currentMonth },
            year: { lte: year ? Number(year) : currentYear },
            status: 'OVERDUE',
          },
        ],
      },
      include: { category: { select: { description: true } } },
      orderBy: [{ year: 'asc' }, { month: 'asc' }, { description: 'asc' }],
    }),
    prisma.transaction.groupBy({
      by: ['month'],
      where: { userId },
      orderBy: { month: 'asc' },
    }),
    prisma.transaction.groupBy({
      by: ['year'],
      where: { userId },
      orderBy: { year: 'asc' },
    }),
    prisma.category.findMany({
      where: { Transaction: { some: { userId } } },
      select: { description: true },
    }),
  ])

  const response = {
    data: transactions,
    metadata: {
      months: arrMonths.map((item) => item.month),
      years: arrYears.map((item) => item.year),
      categories: arrCategories.map((item) => item.description),
    },
  }

  return response
}

export async function deleteMany(transactions: Transaction[]) {
  const IDs = transactions.map((item) => item.uuid)

  await prisma.transaction.deleteMany({
    where: {
      uuid: { in: IDs as string[] },
    },
  })

  revalidatePath('/')
}

export async function deleteUnique(transaction: Transaction) {
  await prisma.transaction.delete({ where: { id: transaction.id } })

  revalidatePath('/')
}

export async function changeStatus(id: number, newStatus: StatusTransaction) {
  await prisma.transaction.update({
    where: { id },
    data: { status: newStatus },
  })

  revalidatePath('/')
}

export async function update(
  formState: UpdateTransactionFormState,
  formData: FormData,
): Promise<UpdateTransactionFormState> {
  const parsed = UpdateTransactionSchema.safeParse({
    transactionId: formData.get('transactionId'),
    amount: formData.get('amount'),
  })

  if (!parsed.success) {
    console.log(formData, parsed.error.message)
    return { success: false, errors: parsed.error.flatten().fieldErrors }
  }

  try {
    await prisma.transaction.update({
      where: { id: parsed.data.transactionId },
      data: { amount: parsed.data.amount },
    })
  } catch (err) {
    if (err instanceof Error) {
      return { success: false, errors: { _form: 'Ocorreu um erro ao salvar' } }
    }
  }

  revalidatePath('/')
  return { success: true, errors: {} }
}
