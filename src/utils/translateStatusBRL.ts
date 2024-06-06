import { StatusTransaction } from '@/lib/types'

export const translateStatusBRL = (status: StatusTransaction) => {
  switch (status) {
    case 'OVERDUE':
      return 'Atrasado'
    case 'PENDING':
      return 'Pendente'
    case 'OK':
      return 'Ok'
  }
}
