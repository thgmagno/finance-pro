import prisma from '@/lib/prisma'
import { SessionPayload } from '@/lib/types'
import * as jose from 'jose'
import { NextRequest, NextResponse } from 'next/server'
import { env } from 'root/env'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUniqueOrThrow({ where: { id } })

    const payload: SessionPayload = {
      id: user.id,
      name: user.name,
      username: user.username,
    }

    if (user.groupId) {
      payload.groupId = user.groupId
    }

    if (user.id === env.VISITOR_ID) {
      payload.visitor = true
    }

    const accessToken = await new jose.SignJWT(payload)
      .setExpirationTime('15m')
      .setProtectedHeader({ alg: 'HS256' })
      .sign(new TextEncoder().encode(env.JWT_SECRET))

    return NextResponse.json({ accessToken }, { status: 200 })
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}
