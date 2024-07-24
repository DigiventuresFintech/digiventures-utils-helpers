import { IRequestHandler } from './IRequestHandler';
import isLambdaError from '../../authorization/error/utils';
import { RequestInfo } from './RequestInfo';
import { LambdaException } from '../errors/LambdaException';
import { Context } from 'aws-lambda';
import { LambdaResponse } from './LambdaResponse';

export abstract class ApiGatewayBaseHandler<I, O>
  implements IRequestHandler<I, LambdaResponse>
{
  /**
   * Main method that be used as lambda entry point
   * @param event Lambda input
   * @param context
   */
  public requestHandler = async (
    event: I,
    context: Context,
  ): Promise<LambdaResponse> => {
    const request: RequestInfo<I> = new RequestInfo(event as I);
    console.log('input received', request);

    try {
      const output: O = await this.handler(request, context);

      console.log('lambda generates output', output);
      return {
        httpStatus: 200,
        body: JSON.stringify(output),
      };
    } catch (error: any) {
      console.error('lambda execution error', error);
      if (isLambdaError(error) || error instanceof LambdaException) {
        return {
          httpStatus: error.httpStatus!,
          body: JSON.stringify({
            message: error?.message || 'Unknown error',
            code: error?.code || 1,
          }),
        };
      }

      return {
        httpStatus: 400,
        body: JSON.stringify({
          message: error?.message || 'Unknown error',
          code: error?.code || 1,
        }),
      };
    }
  };

  /**
   * Base handler function
   * @param input value that be used as input
   * @param context
   */
  abstract handler(input: RequestInfo<I>, context: Context): Promise<O>;
}
