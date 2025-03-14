export class orgAlreadyExistsError extends Error {
  constructor() {
    super('e-mail already exists')
  }
}
