import { Http } from '@/protocols/http'
import { Logger } from '@/protocols/logger'
import parse from 'body-parser'
import cors from 'cors'
import express from 'express'
import { createServer } from 'http'

export interface MakeHttpServerArgs {
  logger: Logger
}

export function makeHttpServer({ logger }: MakeHttpServerArgs): Http.Server {
  const app = express()
  app.use(cors())
  app.use(parse.json())

  const server = createServer(app)

  return {
    listen(port): Promise<void> {
      return new Promise((resolve, reject) => {
        server
          .on('listening', () => {
            resolve()
          })
          .on('error', error => {
            reject(error)
          })
          .listen(port)
      })
    },
    endpoint<Params extends object, RequestBody, ResponseBody>(
      method: Http.Method,
      path: string,
      handler: Http.Handler<Params, RequestBody, ResponseBody>
    ): void {
      app[method](path, (
        request: express.Request<Params, ResponseBody, RequestBody, Params>,
        response: express.Response<ResponseBody>
      ) => {
        const params = {
          ...request.params,
          ...request.query
        }
        const { body } = request

        handler(params, body)
          .then(result => {
            response.status(result.statusCode)
              .json(result.body)
          })
          .catch((error: Error) => {
            logger.error(error)
          })
      })
    },
    shutdown(): Promise<void> {
      const promise = new Promise<void>((resolve, reject) => {
        server.close(error => {
          if (error) {
            reject(error)
          } else {
            resolve()
          }
        })
      })
      return promise
    }
  }
}
