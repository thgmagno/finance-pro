'use server'

import {
  CreateAccountFormState,
  CreateAccountSchema,
  LoginFormState,
  LoginSchema,
} from '@/lib/form-handlers/auth'
import prisma from '@/lib/prisma'
import { SessionPayload } from '@/lib/types'
import * as bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'
import { actions } from '..'

export async function register(
  formState: CreateAccountFormState,
  formData: FormData,
): Promise<CreateAccountFormState> {
  const parsed = CreateAccountSchema.safeParse({
    name: formData.get('name'),
    username: formData.get('username'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    const usernameAlreadyExists = await prisma.user.count({
      where: { username: parsed.data.username },
    })

    if (usernameAlreadyExists) {
      return { errors: { username: ['Usuário já cadastrado'] } }
    }

    const passwordHash = await bcrypt.hash(parsed.data.password, 10)

    const user = await prisma.user.create({
      data: {
        name: parsed.data.name,
        username: parsed.data.username,
        password: passwordHash,
      },
    })

    const payload: SessionPayload = {
      id: user.id,
      name: user.name,
      username: user.username,
    }

    await actions.session.set(payload)
  } catch {
    return {
      errors: {
        _form: 'Não foi possível estabelecer uma conexão segura com o servidor',
      },
    }
  }

  redirect('/')
}

export async function login(
  formState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const parsed = LoginSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  try {
    const user = await prisma.user.findUnique({
      where: { username: parsed.data.username },
    })

    if (!user) return { errors: { username: ['Usuário não encontrado'] } }

    const passwordMatch = await bcrypt.compare(
      parsed.data.password,
      user.password as string,
    )

    if (!passwordMatch) {
      return { errors: { password: ['Senha inválida'] } }
    }

    console.log(user)

    const payload = {
      id: user.id,
      name: user.name,
      username: user.username,
      groupId: user.groupId || undefined,
    }

    console.log(payload)

    await actions.session.set(payload)
  } catch (error) {
    console.error(error)
    return {
      errors: {
        _form: 'Não foi possível estabelecer uma conexão segura com o servidor',
      },
    }
  }

  redirect('/')
}
