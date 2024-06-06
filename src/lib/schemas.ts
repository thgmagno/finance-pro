import { parseCurrency } from '@/utils/parseCurrency'
import { z } from 'zod'

export const LoginSchema = z.object({
  username: z.string(),
  password: z.string(),
})

export const TransactionSchema = z.object({
  type: z.enum(['EXPENSE', 'INCOME']),
  category: z
    .string()
    .nullable()
    .transform((val) => (val ? parseInt(val) : 0))
    .refine((val) => {
      return !isNaN(val) && val >= 1
    }, 'Selecione a categoria'),
  description: z.string().min(1, 'Informe a descrição'),
  amount: z
    .string()
    .refine((val) => {
      const clearedValue = parseCurrency(val)
      return !isNaN(clearedValue) && clearedValue >= 0.01
    }, 'Informe um valor')
    .transform((val) => parseCurrency(val)),
  recurrency: z
    .string()
    .nullable()
    .transform((val) =>
      val === 'empty' || !val ? 1 : parseInt(val.replace('x', '')),
    ),
})

export const CategorySchema = z.object({
  userId: z.number(),
  type: z.enum(['EXPENSE', 'INCOME']),
  description: z.string().min(1, 'Informe a descrição'),
})
