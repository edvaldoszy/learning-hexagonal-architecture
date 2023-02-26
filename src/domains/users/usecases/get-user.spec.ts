import { randEmail, randFullName, randUuid } from '@ngneat/falso'

import { UserNotFoundError } from './errors/user-not-found'
import { GetUserService, makeGetUser } from './get-user'

describe('User > GetUserUseCase', () => {
  const userService: GetUserService = {
    getById: jest.fn()
  }

  it('should get a user', async () => {
    // arrange
    const userId = randUuid()

    jest.mocked(userService.getById).mockResolvedValue({
      id: userId,
      name: randFullName(),
      email: randEmail()
    })

    const getUser = makeGetUser({ userService })

    // act
    const user = await getUser(userId)

    // asert
    expect(user.id).toEqual(userId)
    expect(user).toMatchObject({
      id: expect.any(String),
      name: expect.any(String),
      email: expect.any(String)
    })
  })

  it('should throw error if user does not exist', async () => {
    // arrange
    const userId = randUuid()
    jest.mocked(userService.getById).mockResolvedValue(undefined)

    const getUser = makeGetUser({ userService })

    // act
    const promise = getUser(userId)

    // assert
    await expect(promise).rejects.toThrowError(new UserNotFoundError(userId))
    await expect(promise).rejects.toBeInstanceOf(UserNotFoundError)
    expect(userService.getById).toBeCalled()
  })
})
