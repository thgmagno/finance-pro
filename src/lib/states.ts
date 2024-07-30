export interface LoginFormState {
  errors: {
    username?: string[]
    password?: string[]
    _form?: string
  }
}

export interface CreateAccountFormState {
  errors: {
    name?: string[]
    username?: string[]
    password?: string[]
    confirmPassword?: string[]
    _form?: string
  }
}

export interface TransactionFormState {
  errors: {
    description?: string[]
    amount?: string[]
    month?: string[]
    category?: string[]
    _form?: string
  }
}

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
