'use server'

import { prisma } from '@/lib/prisma'
import { TransactionSchema } from '@/lib/schemas'
import { TransactionFormState } from '@/lib/states'
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
