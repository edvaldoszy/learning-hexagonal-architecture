import { Http } from '@/protocols/http'

import { createUserController } from './controllers/create-user'
import { getUserController } from './controllers/get-user'

export const routes: Http.Route[] = [
  {
    public: true,
    method: Http.Method.Get,
    path: '/users/:userId',
    handler: getUserController
  },
  {
    public: true,
    method: Http.Method.Post,
    path: '/users',
    handler: createUserController
  }
]
