export class UserNotFoundError extends Error {
  constructor(id: string) {
    super(`User with ID '${id}' does not exist`)
  }
}
