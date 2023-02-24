import { makeHttpServer } from './adapters/express'
import { makeApp } from './app'
import { routes } from './domains/users/http/routes'
import { makeLogger } from './factories/logger'

const logger = makeLogger()
const httpServer = makeHttpServer({ logger })

const app = makeApp({ routes, httpServer, logger })

app.start()
  .then(() => {
    logger.info('App initialized')
  })
  .catch(error => {
    logger.error(error)
  })
