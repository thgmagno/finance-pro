'use server'

import { TransactionSchema } from '@/lib/schemas'
import { TransactionFormState } from '@/lib/states'

export async function create(
  formState: TransactionFormState,
  formData: FormData,
): Promise<TransactionFormState> {
  const parsed = TransactionSchema.safeParse({
    type: formData.get('type'),
    description: formData.get('description'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  return { errors: {} }
}

export async function findMany() {}
