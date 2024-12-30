import isLambdaError from '../../authorization/error/utils';
import { LambdaException } from '../errors/LambdaException';

export interface LambdaResponse {
  statusCode: number;
  headers: { [key: string]: string };
  body: string;
  isBase64Encoded?: boolean;
}

const defaultHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

export function createResponse(
  statusCode: number,
  body: string,
  customHeaders?: { [key: string]: string },
): LambdaResponse {
  return {
    statusCode,
    headers: { ...defaultHeaders, ...customHeaders },
    body,
    isBase64Encoded: false,
  };
}

export function createErrorResponse(
  error: any,
  defaultStatusCode: number = 400,
): LambdaResponse {
  const isLambdaErrorCondition =
    isLambdaError(error) || error instanceof LambdaException;

  return {
    statusCode: isLambdaErrorCondition ? error.httpStatus! : defaultStatusCode,
    headers: defaultHeaders,
    body: JSON.stringify({
      message: error?.message || 'Unknown error',
      code: error?.code || 1,
    }),
  };
}
