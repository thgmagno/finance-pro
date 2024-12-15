'use server'

import { VisitorPermissionException } from '@/lib/exceptions/VisitorPermissionException'
import { SessionPayload } from '@/lib/types'
import * as jose from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { env } from 'root/env'

export async function get(strict?: boolean) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get(env.ACCESS_TOKEN)?.value
  if (!accessToken) redirect('/entrar')

  try {
    const parsedToken = await jose.jwtVerify(
      accessToken,
      new TextEncoder().encode(env.JWT_SECRET),
    )

    if (strict && parsedToken.payload.visitor) {
      throw new VisitorPermissionException()
    }

    return JSON.parse(JSON.stringify(parsedToken.payload)) as SessionPayload
  } catch (error) {
    if (error instanceof VisitorPermissionException) {
      throw error
    }

    redirect('/entrar')
  }
}

export async function set(payload: SessionPayload) {
  const cookieStore = await cookies()

  const accessToken = await new jose.SignJWT(payload)
    .setExpirationTime('15m')
    .setProtectedHeader({ alg: 'HS256' })
    .sign(new TextEncoder().encode(env.JWT_SECRET))

  const refreshToken = await new jose.SignJWT(payload)
    .setExpirationTime('30d')
    .setProtectedHeader({ alg: 'HS256' })
    .sign(new TextEncoder().encode(env.JWT_SECRET))

  cookieStore.set(env.ACCESS_TOKEN, accessToken, {
    httpOnly: true,
    secure: true,
    path: '/',
    maxAge: env.ACCESS_TOKEN_MAX_AGE,
  })

  cookieStore.set(env.REFRESH_TOKEN, refreshToken, {
    httpOnly: true,
    secure: true,
    path: '/',
    maxAge: env.REFRESH_TOKEN_MAX_AGE,
  })
}

export async function del(redirectTo: string = '/entrar') {
  const cookieStore = await cookies()
  cookieStore.delete(env.ACCESS_TOKEN)
  cookieStore.delete(env.REFRESH_TOKEN)
  redirect(redirectTo)
}

export async function createVisitorSession() {
  const payload = {
    id: env.VISITOR_ID,
    name: 'Visitante',
    username: 'visitante',
    groupId: env.VISITOR_GROUP_ID,
    visitor: true,
  }

  return set(payload).then(() => redirect('/'))
}
