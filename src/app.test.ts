import { makeApp } from './app'
import { Http } from './protocols/http'

describe('App', () => {
  const httpServer = {
    listen: jest.fn(),
    endpoint: jest.fn(),
    shutdown: jest.fn()
  }

  const logger = {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call server "listen" method', async () => {
    // arrange
    const routes: Http.Route[] = []
    const app = makeApp({ routes, httpServer, logger })

    // act
    await app.start()

    // assert
    expect(httpServer.listen).toBeCalled()
    expect(logger.info).toBeCalledWith('Starting app...')
  })

  it('should call server "endpoint" method', async () => {
    // arrange
    const routes: Http.Route[] = [
      {
        method: Http.Method.Post,
        path: '/users',
        handler: jest.fn()
      }
    ]
    const app = makeApp({ routes, httpServer, logger })

    // act
    await app.start()

    // assert
    expect(httpServer.endpoint).toBeCalledWith('post', '/users', expect.anything())
  })
})
