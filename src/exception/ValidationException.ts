export class ValidationException extends Error {
  errors: string[];

  constructor(errorList: string[]) {
    super('DTO validation exception');
    this.errors = errorList;
    Object.setPrototypeOf(this, ValidationException.prototype);
  }

  toJSON() {
    return {
      errors: this.errors.map(error => ({ error })),
    };
  }
}
