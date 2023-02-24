import { userServiceFactory } from '@/factories/user-service'
import { createHttpError } from '@/helpers/create-http-error'
import { Http } from '@/protocols/http'

import { makeGetUser } from '../../usecases/get-user'

const userService = userServiceFactory()
const getUserUseCase = makeGetUser({ userService })

export const getUserController: Http.Handler<{ userId: string }> = async params => {
  try {
    const user = await getUserUseCase(params.userId)
    return {
      statusCode: 200,
      body: user
    }
  } catch (error) {
    return createHttpError(error)
  }
}
