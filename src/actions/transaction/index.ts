'use server'

import { prisma } from '@/lib/prisma'
import { TransactionSchema } from '@/lib/schemas'
import { TransactionFormState } from '@/lib/states'
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
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  const pathname = parsed.data?.type === 'EXPENSE' ? '/despesa' : '/receita'

  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const uuid = randomUUID()

  try {
    const promises = []

    for (let i = 0; i < parsed.data.recurrency; i++) {
      const month = (currentMonth + i) % 12
      const year = currentYear + Math.floor((currentMonth + i) / 12)

      promises.push(
        prisma.transaction.create({
          data: {
            description: parsed.data.description,
            amount: parsed.data.amount,
            month,
            year,
            type: parsed.data.type,
            categoryId: parsed.data.category,
            userId: 1,
            uuid,
          },
        }),
      )
    }

    await Promise.all(promises)
  } catch (err) {
    if (err instanceof Error) {
      return { errors: { _form: 'Ocorreu um erro ao salvar' } }
    }
  }

  revalidatePath('/')
  redirect(pathname)
}

export async function findMany() {
  return prisma.transaction.findMany()
}
