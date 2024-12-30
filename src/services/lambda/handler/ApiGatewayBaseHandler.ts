import { IRequestHandler } from './IRequestHandler';
import { RequestInfo } from './RequestInfo';
import { Context } from 'aws-lambda';
import {
  createErrorResponse,
  createResponse,
  LambdaResponse,
} from './LambdaResponse';

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
      return createResponse(200, JSON.stringify(output));
    } catch (error: any) {
      console.error('lambda execution error', error);
      return createErrorResponse(error);
    }
  };

  /**
   * Base handler function
   * @param input value that be used as input
   * @param context
   */
  abstract handler(input: RequestInfo<I>, context: Context): Promise<O>;
}
