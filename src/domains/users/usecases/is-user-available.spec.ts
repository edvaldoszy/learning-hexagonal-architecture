import { randUuid } from '@ngneat/falso'

import { UserNotFoundError } from './errors/user-not-found'
import { makeIsUserAvailable } from './is-user-available'

describe('User > IsUserAvailableUseCase', () => {
  const userService = {
    checkUserAvailableById: jest.fn()
  }

  it('should return true if user exist', async () => {
    // arrange
    const userId = randUuid()
    jest.mocked(userService.checkUserAvailableById).mockResolvedValue(true)

    const isUserAvailableUseCase = makeIsUserAvailable({ userService })

    // act
    const promise = isUserAvailableUseCase(userId)

    // assert
    await expect(promise).resolves.toBe(true)
    expect(userService.checkUserAvailableById).toBeCalledWith(userId)
  })

  it('should throw error if user does not exist', async () => {
    // arrange
    const userId = randUuid()
    jest.mocked(userService.checkUserAvailableById).mockResolvedValue(false)

    const isUserAvailableUseCase = makeIsUserAvailable({ userService })

    // act
    const promise = isUserAvailableUseCase(userId)

    // assert
    await expect(promise).rejects.toThrowError(new UserNotFoundError(userId))
    await expect(promise).rejects.toBeInstanceOf(UserNotFoundError)
    expect(userService.checkUserAvailableById).toBeCalledWith(userId)
  })
})
