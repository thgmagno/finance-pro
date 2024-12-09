import { NextRequest, NextResponse } from 'next/server'
import { actions } from './actions'

export default async function middleware(request: NextRequest) {
  const publicRoutes = [
    '/cadastrar',
    '/conheca-o-projeto',
    '/entrar',
    '/feedbacks',
    '/license',
  ]
  const pathname = request.nextUrl.pathname
  const { id, username } = await actions.session.get()
  const authenticated = !!id && !!username

  if (publicRoutes.includes(pathname)) {
    return authenticated
      ? NextResponse.redirect(new URL('/', request.url))
      : NextResponse.next()
  }

  if (!authenticated) {
    return NextResponse.redirect(new URL('/entrar', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
