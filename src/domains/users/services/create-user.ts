import { Database } from '@/protocols/database'

import { User } from '../entities/user'
import { CreateUserService } from '../usecases/create-user'

interface MakeCreateUserArgs {
  builder: Database.Builder
}

export const makeCreateUserService: MakeService<MakeCreateUserArgs, CreateUserService> = ({ builder }) => {
  return {
    async create(user): Promise<string> {
      const [userId] = await builder.from('users')
        .insert({
          name: user.name,
          email: user.email
        })

      return String(userId)
    },
    async isEmailAvailable(email): Promise<boolean> {
      const result = await builder.from('users')
        .select('email')
        .where('email', email)
        .first<User>()

      return !result?.email
    }
  }
}
