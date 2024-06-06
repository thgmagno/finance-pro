export type PayloadType = {
  id: string
  name: string
  username: string
}

export type TypeTransaction = 'EXPENSE' | 'INCOME'

export type StatusTransaction = 'OVERDUE' | 'PENDING' | 'OK'

export type Transaction = {
  id: number
  description: string
  amount: number
  month: number
  year: number
  status: StatusTransaction
  type: TypeTransaction
  categoryId: number
  userId: number
  uuid: string | null
}

export type SelectOptions = {
  value: number
  label: string
}

export type Category = {
  id: number
  description: string
  type: TypeTransaction
}
