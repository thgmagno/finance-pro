import { StatusTransaction } from '@/lib/types'

export const getStatusColor = (status: StatusTransaction) => {
  const colors = {
    OVERDUE: 'text-red-500',
    PENDING: '',
    OK: 'text-green-500',
  }

  return colors[status]
}
