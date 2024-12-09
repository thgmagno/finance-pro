import { actions } from '@/actions'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const session = await actions.session.get()

    const newPayload = {
      ...session,
      groupId: undefined,
    }

    await actions.session.set(newPayload)

    return NextResponse.redirect(new URL(request.url).origin)
  } catch {
    return NextResponse.json(null, { status: 401 })
  }
}
