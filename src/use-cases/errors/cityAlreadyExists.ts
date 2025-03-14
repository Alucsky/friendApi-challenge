export class cityAlreadyExistsError extends Error {
  constructor() {
    super('city already exists')
  }
}
