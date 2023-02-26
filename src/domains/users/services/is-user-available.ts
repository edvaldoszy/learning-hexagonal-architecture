import { Database } from '@/protocols/database'

import { UserAvailableService } from '../usecases/is-user-available'

interface MakeIsUserAvailableArgs {
  builder: Database.Builder
}

export const makeIsUserAvailable: MakeService<MakeIsUserAvailableArgs, UserAvailableService> = ({ builder }) => {
  return {
    async checkUserAvailableById(id): Promise<boolean> {
      const user = await builder.from('users')
        .select('id')
        .where('users.id', id)
        .first<{ id: string } | undefined>()

      return Boolean(user?.id)
    }
  }
}
