export class LambdaException extends Error {

  private readonly _internalError: number;
  private readonly _body: any

  constructor(
    message: string,
    internalError: number = 400,
    body:any = null,
  ) {
    super(message);
    this._internalError = internalError
    this._body = body
  }

  get internalError(): number {
    return this._internalError;
  }

  get body(): any {
    return this._body;
  }

  get trace(): string {
    return `[TRACE] [EXCEPTION] message: {${this.message}} InternalError {${this.internalError}} Body {${this._body}}`
  }
}
