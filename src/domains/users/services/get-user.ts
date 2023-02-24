import { Database } from '@/protocols/database'
import { MakeService } from '@/protocols/make-service'

import { User } from '../entities/user'
import { GetUserService } from '../usecases/get-user'

interface MakeGetUserServiceArgs {
  builder: Database.Builder
}

export const makeGetUserService: MakeService<MakeGetUserServiceArgs, GetUserService> = ({ builder }) => {
  return {
    async getById(id): Promise<User | undefined> {
      const record = await builder.from('users')
        .where('users.id', id)
        .first<User>()

      return record
    }
  }
}
