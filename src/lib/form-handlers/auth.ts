import { z } from 'zod'

export interface LoginFormState {
  errors: {
    username?: string[]
    password?: string[]
    _form?: string
  }
}

export interface CreateAccountFormState {
  errors: {
    name?: string[]
    username?: string[]
    password?: string[]
    confirmPassword?: string[]
    _form?: string
  }
}

export const LoginSchema = z.object({
  username: z
    .string()
    .min(1, 'Informe o usuário')
    .max(50, 'O usuário deve ter no máximo 50 caracteres'),
  password: z
    .string()
    .min(1, 'Informe a senha')
    .max(50, 'A senha deve ter no máximo 50 caracteres'),
})

export const CreateAccountSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Informe o nome')
      .max(100, 'O nome deve ter no máximo 100 caracteres'),
    username: z
      .string()
      .min(1, 'Informe o usuário')
      .max(50, 'O usuário deve ter no máximo 50 caracteres'),
    password: z
      .string()
      .min(1, 'Informe a senha')
      .max(50, 'A senha deve ter no máximo 50 caracteres'),
    confirmPassword: z.string().min(1, 'Confirme a senha'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'As senhas não coincidem',
  })
