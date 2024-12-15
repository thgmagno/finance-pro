import * as auth from '@/actions/auth'
import * as categories from '@/actions/categories'
import * as group from '@/actions/group'
import * as project from '@/actions/project'
import * as session from '@/actions/session'
import * as transaction from '@/actions/transaction'
import * as user from '@/actions/user'

export const actions = {
  auth,
  session,
  group,
  transaction,
  project,
  categories,
  user,
}
