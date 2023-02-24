import { userServiceFactory } from '@/factories/user-service'
import { createHttpError } from '@/helpers/create-http-error'
import { Http } from '@/protocols/http'

import { makeCreateUser } from '../../usecases/create-user'
import { makeGetUser } from '../../usecases/get-user'

const userService = userServiceFactory()
const createUserUseCase = makeCreateUser({ userService })
const getUserUseCase = makeGetUser({ userService })

type CreateUserBody = {
  name: string
  email: string
}

export const createUserController: Http.Handler<object, CreateUserBody> = async (_, data) => {
  try {
    const userId = await createUserUseCase(data)
    const user = await getUserUseCase(userId)
    return {
      statusCode: 201,
      body: user
    }
  } catch (error) {
    return createHttpError(error)
  }
}
