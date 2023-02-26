import {
  randBoolean, randUuid, randWord
} from '@ngneat/falso'

import { makeCreateListUseCase } from './create-list'

describe('Todo > CreateListUseCase', () => {
  const userService = {
    checkUserAvailableById: jest.fn()
  }
  const listService = {
    create: jest.fn()
  }

  it('should create a list', async () => {
    // arrange
    const userId = randUuid()
    const listData = {
      name: randWord(),
      active: randBoolean(),
      userId
    }

    const listEntity = {
      ...listData,
      id: randUuid()
    }

    jest.mocked(userService.checkUserAvailableById).mockResolvedValue(true)
    jest.mocked(listService.create).mockResolvedValue(listEntity)

    const createListUseCase = makeCreateListUseCase({ userService, listService })

    // act
    const promise = createListUseCase(listData)

    // assert
    await expect(promise).resolves.not.toThrow()
    expect(userService.checkUserAvailableById).toBeCalledWith(userId)
    expect(listService.create).toBeCalledWith(listData)
  })
})
