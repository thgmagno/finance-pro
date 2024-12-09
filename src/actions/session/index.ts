'use server'

import { VisitorPermissionException } from '@/lib/exceptions/VisitorPermissionException'
import { SessionPayload } from '@/lib/types'
import * as jose from 'jose'
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
  const token = cookieStore.get(env.SESSION_COOKIE_NAME)?.value
  if (!token) return emptySession

  try {
    const result = await jose.jwtVerify(
      token,
      new TextEncoder().encode(env.JWT_SECRET),
    )

    if (strict && result.payload.visitor) {
      throw new VisitorPermissionException()
    }

    return JSON.parse(JSON.stringify(result.payload)) as SessionPayload
  } catch (error) {
    if (error instanceof VisitorPermissionException) {
      throw error
    }

    return emptySession
  }
}

export async function set(payload: SessionPayload) {
  const cookieStore = await cookies()
  const token = await new jose.SignJWT(payload)
    .setExpirationTime(payload.visitor ? '1h' : '30d')
    .setProtectedHeader({ alg: 'HS256' })
    .sign(new TextEncoder().encode(env.JWT_SECRET))

  // 1 hour = 60 * 60
  // 30 days = 30 * 24 * 60 * 60
  const maxAge = payload.visitor ? 60 * 60 : 30 * 24 * 60 * 60

  return cookieStore.set(env.SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    path: '/',
    maxAge,
  })
}

export async function del(redirectTo: string = '/entrar') {
  const cookieStore = await cookies()
  cookieStore.set(env.SESSION_COOKIE_NAME, '', {
    maxAge: 0,
  })
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
