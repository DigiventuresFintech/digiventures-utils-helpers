import { APIGatewayProxyResult } from 'aws-lambda';

export class LambdaException extends Error {
  readonly httpStatus: number;
  readonly code: any;

  constructor(message: string, httpStatus: number = 400, code: number = 1) {
    super(message);
    this.name = 'LambdaException';
    this.message = message;
    this.httpStatus = httpStatus;
    this.code = code;
  }

  trace(): string {
    return `[TRACE] [EXCEPTION] message: {${this.message}} InternalError {${this.httpStatus}} Code {${this.code}}`;
  }

  /**
   * This method generate an error response using a custom lambda exception
   * @private
   */
  buildApiResponse(): APIGatewayProxyResult {
    return {
      statusCode: this.httpStatus,
      body: JSON.stringify({
        message: this.message ? this.message : 'Unknown error',
        code: this.code,
      }),
    };
  }
}
