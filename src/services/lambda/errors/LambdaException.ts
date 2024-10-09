import { APIGatewayProxyResult } from 'aws-lambda';

export class LambdaException extends Error {
  readonly httpStatus: number;
  readonly code: any;
  readonly data?: any;

  constructor(
    message: string,
    httpStatus: number = 400,
    code: number = 1,
    data?: any,
  ) {
    super(message);
    this.name = 'LambdaException';
    this.message = message;
    this.httpStatus = httpStatus;
    this.code = code;
    this.data = data;
  }

  trace(): string {
    return `[TRACE] [EXCEPTION] message: {${this.message}} InternalError {${this.httpStatus}} Code {${this.code}}`;
  }

  /**
   * This method generate an error response using a custom lambda exception
   * @private
   */
  buildApiResponse(): APIGatewayProxyResult {
    let parsedData = this.data;

    if (typeof this.data === 'string') {
      try {
        parsedData = JSON.parse(this.data);
      } catch (error) {
        parsedData = { error: 'Invalid JSON format' };
      }
    }

    return {
      statusCode: this.httpStatus,
      body: JSON.stringify({
        message: this.message ?? 'Unknown error',
        code: this.code,
        data: parsedData,
      }),
    };
  }
}
