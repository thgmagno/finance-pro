import { actions } from '@/actions'
import { SessionPayload } from '@/lib/types'
import * as jose from 'jose'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { env } from 'root/env'

export async function POST(request: Request) {
  try {
    const { refreshToken } = await request.json()

    const parsedRefreshToken = await jose.jwtVerify(
      refreshToken,
      new TextEncoder().encode(env.JWT_SECRET),
    )

    const { sub } = parsedRefreshToken.payload

    const newSession = await actions.user.getUserInfo(sub as string)

    const newPayload: SessionPayload = {
      id: newSession.id,
      name: newSession.name,
      username: newSession.username,
      groupId: newSession.group?.id,
    }

    const cookieStore = await cookies()
    const accessTokenMaxAge = 60

    const accessToken = await new jose.SignJWT(newPayload)
      // Teste em desenvolvimento
      .setExpirationTime('1m')
      .setProtectedHeader({ alg: 'HS256' })
      .sign(new TextEncoder().encode(env.JWT_SECRET))

    cookieStore.set(env.ACCESS_TOKEN, accessToken, {
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: accessTokenMaxAge,
    })

    return NextResponse.json({
      message: 'Tokens renovados com sucesso!',
      status: 200,
    })
  } catch (error) {
    return NextResponse.json({
      message: 'Erro ao renovar tokens!',
      status: 401,
    })
  }
}
