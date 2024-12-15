'use server'

import { VisitorPermissionException } from '@/lib/exceptions/VisitorPermissionException'
import { SessionPayload } from '@/lib/types'
import * as jose from 'jose'
import { errors } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { env } from 'root/env'

const emptySession: SessionPayload = {
  id: '',
  name: '',
  username: '',
  groupId: '',
  visitor: false,
}

export async function get(
  strict?: boolean,
): Promise<SessionPayload | typeof emptySession> {
  const cookieStore = await cookies()
  const [accessToken, refreshToken] = [
    cookieStore.get(env.ACCESS_TOKEN)?.value,
    cookieStore.get(env.REFRESH_TOKEN)?.value,
  ]

  if (!refreshToken) return emptySession

  try {
    if (!accessToken) return emptySession

    const parsedAccessToken = await jose.jwtVerify(
      accessToken,
      new TextEncoder().encode(env.JWT_SECRET),
    )

    if (strict && parsedAccessToken.payload.visitor) {
      throw new VisitorPermissionException()
    }

    return JSON.parse(
      JSON.stringify(parsedAccessToken.payload),
    ) as SessionPayload
  } catch (error) {
    if (error instanceof errors.JWTExpired) {
      const renewed = await renewSession(refreshToken)
      if (renewed) return await get(strict)
    }

    if (error instanceof VisitorPermissionException) {
      throw error
    }

    return emptySession
  }
}

async function renewSession(_refreshToken: string) {
  try {
    const response = await fetch(`${env.API_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ refreshToken: _refreshToken }),
    })

    return response.status === 200
  } catch (error) {
    console.error('Error renewing session.')
    return false
  }
}

export async function set(payload: SessionPayload) {
  const cookieStore = await cookies()

  const accessToken = await new jose.SignJWT(payload)
    // Teste em desenvolvimento
    .setExpirationTime('1m')
    .setProtectedHeader({ alg: 'HS256' })
    .sign(new TextEncoder().encode(env.JWT_SECRET))

  const refreshToken = await new jose.SignJWT(payload)
    .setExpirationTime('30d')
    .setProtectedHeader({ alg: 'HS256' })
    .sign(new TextEncoder().encode(env.JWT_SECRET))

  const accessTokenMaxAge = 15 * 60
  const refreshTokenMaxAge = 30 * 24 * 60 * 60

  cookieStore.set(env.ACCESS_TOKEN, accessToken, {
    httpOnly: true,
    secure: true,
    path: '/',
    maxAge: accessTokenMaxAge,
  })

  cookieStore.set(env.REFRESH_TOKEN, refreshToken, {
    httpOnly: true,
    secure: true,
    path: '/',
    maxAge: refreshTokenMaxAge,
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
