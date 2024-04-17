/**
 * Class for manage unauthorized error
 */
export class UnauthorizedError extends Error {
  constructor() {
    super();
    this.message = 'Unauthorized';
  }

  /**
   * Error trace property (string).
   */
  public get trace() {
    return this.message;
  }
}
