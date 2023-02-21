import { MakeUseCase } from '@/protocols/make-use-case'

import { User } from '../entities/user'
import { EmailAlreadyTakenError } from './errors/email-already-taken'

export interface CreateUserService {
  isEmailAvailable(email: string): Promise<boolean>
  create(user: Omit<User, 'id'>): Promise<string>
}

export interface CreateUserUseCase {
  (user: Omit<User, 'id'>): Promise<string>
}

interface MakeCreateUserArgs {
  userService: CreateUserService
}

export const makeCreateUser: MakeUseCase<MakeCreateUserArgs, CreateUserUseCase> = ({ userService }) => {
  return async (user: Omit<User, 'id'>): Promise<string> => {
    const isEmailAvailable = await userService.isEmailAvailable(user.email)
    if (!isEmailAvailable) {
      throw new EmailAlreadyTakenError(user.email)
    }

    const userId = await userService.create(user)
    return userId
  }
}
