import { StatusTransaction, TypeTransaction } from '@prisma/client'
import { z } from 'zod'

export interface TransactionFormState {
  errors: {
    description?: string[]
    amount?: string[]
    month?: string[]
    year?: string[]
    type?: string[]
    categoryId?: string[]
    status?: string[]
    _form?: string
  }
}

const clearValue = (value: string) => {
  return (
    parseFloat(
      value.replace(/\D/g, '').trim().replaceAll('.', '').replace(',', '.'),
    ) / 100
  )
}

export const TransactionSchema = z.object({
  id: z.string().optional().nullable(),
  description: z.string().min(1, 'Informe a descrição'),
  amount: z
    .string()
    .min(1, 'Informe o valor')
    .refine((val) => {
      const clear = clearValue(val)
      return !isNaN(Number(clear)) && Number(clear) > 0
    }, 'Informe um valor válido')
    .transform((value) => Number(clearValue(value))),
  month: z
    .string()
    .min(1, 'Informe o mês')
    .refine((val) => {
      const indexMonth = getMonthIndex(val)
      return !isNaN(indexMonth) && indexMonth > 0 && indexMonth <= 12
    })
    .transform((val) => getMonthIndex(val)),
  year: z
    .string()
    .min(1, 'Informe o ano')
    .refine((value) => !isNaN(Number(value)) && Number(value) > 0, {
      message: 'Informe um ano válido',
    })
    .transform((value) => Number(value)),
  type: z.nativeEnum(TypeTransaction),
  categoryId: z
    .string()
    .min(1, 'Informe a categoria')
    .refine((val) => val.includes('__id__'), {
      message: 'Informe uma categoria válida',
    })
    .transform((val) => val.split('__id__')[1]),
  status: z.nativeEnum(StatusTransaction).optional(),
})

function getMonthIndex(month: string) {
  const months = [
    'janeiro',
    'fevereiro',
    'março',
    'abril',
    'maio',
    'junho',
    'julho',
    'agosto',
    'setembro',
    'outubro',
    'novembro',
    'dezembro',
  ]

  const currentMonth = new Date().getMonth()

  return months.findIndex((m) => m === month) ?? currentMonth
}
