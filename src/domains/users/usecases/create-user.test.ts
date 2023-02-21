import { randEmail, randFullName, randUuid } from '@ngneat/falso'

import { CreateUserService, makeCreateUser } from './create-user'
import { EmailAlreadyTakenError } from './errors/email-already-taken'

describe('CreateUserUseCase', () => {
  const userService: CreateUserService = {
    isEmailAvailable: jest.fn(),
    create: jest.fn()
  }

  it('should create a user', async () => {
    // arrange
    jest.mocked(userService.create).mockResolvedValue(randUuid())
    jest.mocked(userService.isEmailAvailable).mockResolvedValue(true)

    const user = {
      name: randFullName(),
      email: randEmail()
    }
    const createUser = makeCreateUser({ userService })

    // act
    const promise = createUser(user)

    // assert
    await expect(promise).resolves.toEqual(expect.any(String))
    expect(userService.isEmailAvailable).toBeCalledWith(user.email)
    expect(userService.create).toBeCalledWith(user)
  })

  it('should throw error if e-mail is already taken', async () => {
    // arrange
    jest.mocked(userService.isEmailAvailable).mockResolvedValue(false)

    const user = {
      name: randFullName(),
      email: randEmail()
    }

    const createUser = makeCreateUser({ userService })

    // act
    const promise = createUser(user)

    // assert
    await expect(promise).rejects.toThrowError(new EmailAlreadyTakenError(user.email))
    await expect(promise).rejects.toBeInstanceOf(EmailAlreadyTakenError)
    expect(userService.isEmailAvailable).toBeCalledWith(user.email)
    expect(userService.create).not.toBeCalled()
  })
})
