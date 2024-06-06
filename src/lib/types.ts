export type PayloadType = {
  id: string
  name: string
  username: string
}

export type TypeTransaction = 'EXPENSE' | 'INCOME'

export type SelectOptions = {
  value: number
  label: string
}

export type Category = {
  id: number
  description: string
  type: TypeTransaction
}
