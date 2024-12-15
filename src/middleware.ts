import * as jose from 'jose'
import { errors } from 'jose'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { env } from 'root/env'
import { SessionPayload } from './lib/types'

export default async function middleware(request: NextRequest) {
  const publicRoutes = [
    '/cadastrar',
    '/conheca-o-projeto',
    '/entrar',
    '/feedbacks',
    '/license',
  ]
  const pathname = request.nextUrl.pathname
  const session = await handleSession()
  const authenticated = !!session

  if (publicRoutes.includes(pathname)) {
    return authenticated
      ? NextResponse.redirect(new URL('/', request.url))
      : NextResponse.next()
  }

  if (!authenticated) {
    return endSession(request)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

async function handleSession() {
  const cookieStore = await cookies()
  const [accessToken, refreshToken] = [
    cookieStore.get(env.ACCESS_TOKEN)?.value ?? '',
    cookieStore.get(env.REFRESH_TOKEN)?.value ?? '',
  ]

  try {
    const session = await jose.jwtVerify(
      accessToken,
      new TextEncoder().encode(env.JWT_SECRET),
    )
    return session.payload as SessionPayload
  } catch (error) {
    if (error instanceof errors.JWTExpired) {
      return validateRefreshToken(refreshToken)
    }
    return null
  }
}

const validateRefreshToken = async (refreshToken: string) => {
  try {
    const { payload } = await jose.jwtVerify(
      refreshToken,
      new TextEncoder().encode(env.JWT_SECRET),
    )

    const response = await fetch(`${env.API_URL}/auth/refresh?id=${payload.id}`)
    if (!response.ok) return null

    const { accessToken } = await response.json()
    if (!accessToken) return null

    const cookieStore = await cookies()

    cookieStore.set(env.ACCESS_TOKEN, accessToken, {
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: env.ACCESS_TOKEN_MAX_AGE,
    })

    return accessToken as unknown as SessionPayload
  } catch {
    return null
  }
}

const endSession = async (request: NextRequest) => {
  const cookieStore = await cookies()
  cookieStore.set(env.ACCESS_TOKEN, '', { maxAge: 0 })
  cookieStore.set(env.REFRESH_TOKEN, '', { maxAge: 0 })
  return NextResponse.redirect(new URL('/entrar', request.url))
}
