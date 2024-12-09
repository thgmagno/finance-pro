export interface UpdateTransactionFormState {
  success: boolean
  errors: {
    amount?: string[]
    _form?: string
  }
}

export interface UpdateManyTransactionFormState {
  success?: boolean
  errors: {
    status?: string[]
  }
}

export interface CategoryFormState {
  success?: boolean
  errors: {
    description?: string[]
    _form?: string
  }
}
