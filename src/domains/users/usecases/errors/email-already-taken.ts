export class EmailAlreadyTakenError extends Error {
  constructor(email: string) {
    super(`${email} address already taken`)
  }
}
