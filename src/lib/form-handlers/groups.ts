import { z } from 'zod'

export interface CreateGroupFormState {
  success?: boolean
  errors: {
    name?: string[]
    description?: string[]
    _form?: string
  }
}

export const CreateGroupSchema = z.object({
  name: z
    .string()
    .min(1, 'Informe o nome do grupo')
    .max(100, 'O nome do grupo deve ter no máximo 100 caracteres'),
  description: z
    .string()
    .max(100, 'A descrição do grupo deve ter no máximo 100 caracteres')
    .optional(),
})
