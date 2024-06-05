import { z } from 'zod'

export const LoginSchema = z.object({
  username: z.string(),
  password: z.string(),
})

export const TransactionSchema = z.object({
  description: z.string(),
  amount: z.number(),
  month: z.number(),
  category: z.number(),
})

export const CategorySchema = z.object({
  type: z.enum(['EXPENSE', 'INCOME']),
  description: z.string(),
})
