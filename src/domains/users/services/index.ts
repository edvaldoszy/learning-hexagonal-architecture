import { Database } from '@/protocols/database'
import { MakeService } from '@/protocols/make-service'

import { CreateUserService } from '../usecases/create-user'
import { GetUserService } from '../usecases/get-user'
import { makeCreateUserService } from './create-user'
import { makeGetUserService } from './get-user'

export interface UserService extends GetUserService, CreateUserService {

}

interface MakeUserServiceArgs {
  builder: Database.Builder
}

export const makeUserService: MakeService<MakeUserServiceArgs, UserService> = ({ builder }) => {
  return {
    ...makeGetUserService({ builder }),
    ...makeCreateUserService({ builder })
  }
}
