export class InvalidFileFormatError extends Error {
  constructor() {
    super('The file format is invalid.')
  }
}
