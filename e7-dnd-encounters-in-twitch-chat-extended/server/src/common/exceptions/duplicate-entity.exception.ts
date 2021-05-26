export class DuplicateEntityException extends Error {
  constructor(message: string | unknown) {
    super(typeof message === 'string' ? message : JSON.stringify(message));
    this.name = 'DuplicateEntityException';
  }
}
