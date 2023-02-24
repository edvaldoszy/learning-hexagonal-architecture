import { Http } from './protocols/http'
import { Logger } from './protocols/logger'

const DEFAULT_SERVER_LISTEN_PORT = 3010

export interface MakeAppArgs {
  routes: Http.Route[]
  httpServer: Http.Server
  logger: Logger
}

export interface App {
  start(): Promise<void>
}

export function makeApp({ routes, httpServer, logger }: MakeAppArgs): App {
  routes.forEach(route => {
    httpServer.endpoint(route.method, route.path, route.handler)
  })

  return {
    async start(): Promise<void> {
      logger.info('Starting app...')
      await httpServer.listen(DEFAULT_SERVER_LISTEN_PORT)
    }
  }
}
