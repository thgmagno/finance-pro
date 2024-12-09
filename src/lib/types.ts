import { Group, Invitation, Transaction } from '@prisma/client'

export type SessionPayload = {
  id: string
  name: string
  username: string
  groupId?: string
  visitor?: boolean
}

export type ActionResponse<T> = {
  error: boolean
  message: string
  data: T
}

export type TransactionsPaginated = {
  currentPage: number
  nextPage: number | null
  previousPage: number | null
  totalPages: number
  totalTransactions: number
  transactions: Transaction[]
}

export type SearchParamsTransactions = {
  pagina?: number
  limite?: number
  descricao?: string
  categoria?: string
  status?: string
  de?: string
  ate?: string
  maior_que?: number
  menor_que?: number
  tipo?: string
}

export type InvitationWithUser = Invitation & { user: { name: string } }

export type GroupWithDetails = Group & {
  creator: { name: string }
  _count: { users: number }
}
