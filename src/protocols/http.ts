export namespace Http {
  export enum Method {
    Get = 'get',
    Post = 'post',
    Put = 'put',
    Delete = 'delete'
  }

  export enum StatusCode {
    Ok = 200,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    PreconditionFailed = 412,
    UnprocessableEntity = 422
  }

  export interface Response<Body> {
    statusCode: number
    body: Body
  }

  export interface Handler<Params extends object = object, RequestBody = any, ResponseBody = any> {
    (params: Params, data: RequestBody): Promise<Response<ResponseBody>>
  }

  export interface Route {
    public?: boolean
    method: Method
    path: string
    handler: Handler<any, any, any>
  }

  export interface Server {
    listen(port: number): Promise<void>
    endpoint<Params extends object, RequestBody, ResponseBody>(
      method: Http.Method,
      path: string,
      handler: Http.Handler<Params, RequestBody, ResponseBody>
    ): void
    shutdown(): Promise<void>
  }
}
