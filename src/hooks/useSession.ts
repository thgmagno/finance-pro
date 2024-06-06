'use server'

import { actions } from '@/actions'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function useSession() {
  const token = cookies().get('finance-pro')

  if (!token || !token.value) redirect('/entrar')

  const response = await actions.auth.openSessionToken(token.value)

  const user = {
    id: response.id as string,
    name: response.name as string,
    username: response.username as string,
  }

  return user
}
