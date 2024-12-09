import { NextResponse } from 'next/server'
import { env } from 'root/env'

export function DELETE() {
  try {
    const response = NextResponse.json(null, { status: 200 })
    response.cookies.set(env.SESSION_COOKIE_NAME, '', {
      maxAge: 0,
    })

    return NextResponse.json(null, { status: 200 })
  } catch {
    return NextResponse.json(null, { status: 500 })
  }
}
