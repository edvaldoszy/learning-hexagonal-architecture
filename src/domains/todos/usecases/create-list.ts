import { UserAvailableService } from '@/domains/users/usecases/is-user-available'

import { List } from '../entities/list'
import { CreateListModel } from '../models/create-list'

export interface CreateListService {
  create(list: CreateListModel): Promise<List>
}

interface MakeCreateListUseCaseArgs {
  userService: UserAvailableService
  listService: CreateListService
}

interface CreateListUseCase {
  (list: CreateListModel): Promise<List>
}

export const makeCreateListUseCase: MakeUseCase<MakeCreateListUseCaseArgs, CreateListUseCase> = ({
  userService,
  listService
}) => {
  return async listData => {
    await userService.checkUserAvailableById(listData.userId)
    const list = await listService.create(listData)

    return list
  }
}
