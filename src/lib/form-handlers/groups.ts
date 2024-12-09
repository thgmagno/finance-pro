import { z } from 'zod'
import { GroupWithDetails } from '../types'

export interface CreateGroupFormState {
  success?: boolean
  errors: {
    name?: string[]
    description?: string[]
    _form?: string
  }
}

export interface DeleteGroupFormState {
  success?: boolean
  errors: {
    confirmGroupName?: string[]
    _form?: string
  }
}

export interface SearchGroupFormState {
  data?: GroupWithDetails[]
  errors: {
    search?: string[]
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

export const DeleteGroupSchema = z.object({
  confirmGroupName: z
    .string()
    .min(1, 'Confirme o nome do grupo para confirmar a exclusão'),
})

export const SearchGroupSchema = z.object({
  search: z.string().min(1, 'Informe o nome ou ID do grupo'),
})
