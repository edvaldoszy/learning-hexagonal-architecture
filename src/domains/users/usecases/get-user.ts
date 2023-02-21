import { MakeUseCase } from '@/protocols/make-use-case'

import { User } from '../entities/user'
import { UserNotFoundError } from './errors/user-not-found'

export interface GetUserService {
  getById(id: string): Promise<User | undefined>
}

interface GetUserUseCase {
  (id: string): Promise<User>
}

interface MakeGetUserArgs {
  userService: GetUserService
}

export const makeGetUser: MakeUseCase<MakeGetUserArgs, GetUserUseCase> = ({ userService }) => {
  return async (id: string): Promise<User> => {
    const user = await userService.getById(id)
    if (!user) {
      throw new UserNotFoundError(id)
    }

    return user
  }
}
