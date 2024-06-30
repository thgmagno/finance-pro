'use server'

import { PayloadType } from '@/lib/types'
import { env } from 'process'
import * as jose from 'jose'
import { cookies } from 'next/headers'
import { CreateAccountFormState, LoginFormState } from '@/lib/states'
import { CreateAccountSchema, LoginSchema } from '@/lib/schemas'
import { redirect } from 'next/navigation'
import * as bcrypt from 'bcrypt'
import prisma from '@/lib/prisma'

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
    const res = await prisma.user.findUnique({
      where: { username: parsed.data.username },
    })

    if (!res) return { errors: { username: ['Usuário não encontrado'] } }

    const passwordMatch = await bcrypt.compare(
      parsed.data.password,
      res.password as string,
    )

    if (!passwordMatch) return { errors: { password: ['Senha inválida'] } }

    const payload = {
      id: String(res.id),
      name: res.name,
      username: res.username,
    }

    await createSessionToken({ payload })
  } catch (err) {
    return {
      errors: {
        _form: 'Não foi possível estabelecer uma conexão segura com o servidor',
      },
    }
  }

  return redirect('/')
}

export async function logout() {
  return cookies().delete('finance-pro')
}

async function createSessionToken({ payload }: { payload: PayloadType }) {
  const secret = new TextEncoder().encode(env.JWT_SECRET)
  const session = await new jose.SignJWT(payload)
    .setProtectedHeader({
      alg: 'HS256',
    })
    .setExpirationTime('7d')
    .sign(secret)

  const { exp } = await openSessionToken(session)

  cookies().set('finance-pro', session, {
    expires: (exp as number) * 1000,
    path: '/',
    httpOnly: true,
  })
}

export async function openSessionToken(token: string) {
  const secret = new TextEncoder().encode(env.JWT_SECRET)
  const { payload } = await jose.jwtVerify(token, secret)

  return payload
}

export async function createAccount(
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
      return { errors: { username: ['Usuário já existe'] } }
    }

    const confirmationPassword =
      parsed.data.password === parsed.data.confirmPassword

    if (!confirmationPassword) {
      return { errors: { confirmPassword: ['As senhas não coincidem'] } }
    }

    const passwordHash = await bcrypt.hash(parsed.data.password, 10)

    const res = await prisma.user.create({
      data: {
        name: parsed.data.name,
        username: parsed.data.username,
        password: passwordHash,
      },
    })

    const payload = {
      id: String(res.id),
      name: res.name,
      username: res.username,
    }

    await createSessionToken({ payload })
  } catch (err) {
    return {
      errors: {
        _form: 'Não foi possível estabeler uma conexão segura com o servidor',
      },
    }
  }

  redirect('/')
}
