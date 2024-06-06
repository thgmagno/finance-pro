'use server'

import { prisma } from '@/lib/prisma'
import { CategorySchema } from '@/lib/schemas'
import { CategoryFormState } from '@/lib/states'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function create(
  formState: CategoryFormState,
  formData: FormData,
): Promise<CategoryFormState> {
  const parsed = CategorySchema.safeParse({
    userId: formData.get('userId'),
    type: formData.get('type'),
    description: formData.get('description'),
  })

  const uri =
    parsed.data?.type === 'EXPENSE'
      ? '/despesa?incluir=despesa'
      : '/receita?incluir=receita'

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    await prisma.category.create({
      data: {
        type: parsed.data.type,
        description: parsed.data.description,
        userId: parsed.data.userId,
      },
    })
  } catch (err) {
    if (err instanceof Error) {
      if (err.message.includes('Unique constraint')) {
        return { errors: { description: ['Descrição duplicada'] } }
      } else {
        return { errors: { _form: 'Ocorreu um erro ao salvar' } }
      }
    }
  }

  revalidatePath('/')
  redirect(uri)
}

export async function findMany(userId: number) {
  return prisma.category.findMany({
    where: { userId },
    orderBy: { description: 'asc' },
  })
}
