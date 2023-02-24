import { makeDatabaseConnection } from '@/adapters/database'
import { makeUserService, UserService } from '@/domains/users/services'

export const userServiceFactory = (): UserService => {
  const builder = makeDatabaseConnection()
  return makeUserService({ builder })
}
