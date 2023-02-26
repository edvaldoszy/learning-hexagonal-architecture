import { UserNotFoundError } from './errors/user-not-found'

export interface UserAvailableService {
  checkUserAvailableById(id: string): Promise<boolean>
}

interface MakeIsUserAvailableArgs {
  userService: UserAvailableService
}

interface IsUserAvailableUseCase {
  (id: string): Promise<boolean>
}

export const makeIsUserAvailable: MakeUseCase<MakeIsUserAvailableArgs, IsUserAvailableUseCase> = ({ userService }) => {
  return async id => {
    const isAvailable = await userService.checkUserAvailableById(id)
    if (!isAvailable) {
      throw new UserNotFoundError(id)
    }

    return true
  }
}
