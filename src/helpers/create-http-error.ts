import { EmailAlreadyTakenError } from '@/domains/users/usecases/errors/email-already-taken'
import { UserNotFoundError } from '@/domains/users/usecases/errors/user-not-found'
import { Http } from '@/protocols/http'

export const createHttpError = (error: any): Http.Response<{ error: { code: string; message: string }}> => {
  if (error instanceof UserNotFoundError) {
    return {
      statusCode: 404,
      body: {
        error: {
          code: 'ERR_NOT_FOUND',
          message: error.message
        }
      }
    }
  }

  if (error instanceof EmailAlreadyTakenError) {
    return {
      statusCode: 400,
      body: {
        error: {
          code: 'ERR_EMAIL_ALREADY_TAKEN',
          message: error.message
        }
      }
    }
  }

  return {
    statusCode: 500,
    body: {
      error: {
        code: 'ERR_INTERNAL_SERVER',
        message: 'Internal Server Error'
      }
    }
  }
}
