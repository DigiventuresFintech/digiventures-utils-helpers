import {
  IAuthenticator,
  JwtAuthenticator,
  LambdaException,
  RequestInfo,
} from '../../../src';
import { ApiGatewayBaseHandler } from '../../../src/services/lambda/handler/ApiGatewayBaseHandler';
import { Context } from 'aws-lambda';

describe(__filename, () => {
  interface Input {
    name: string;
  }

  interface Output {
    status: number;
  }

  const context: Context = {
    done(error?: Error, result?: any): void {},
    fail(error: Error | string): void {},
    getRemainingTimeInMillis(): number {
      return 0;
    },
    succeed(message: any, object?: any): void {},
    callbackWaitsForEmptyEventLoop: true,
    functionName: '',
    functionVersion: '',
    invokedFunctionArn: '',
    memoryLimitInMB: '',
    awsRequestId: '',
    logGroupName: '',
    logStreamName: '',
  };

  class BaseHandlerTest extends ApiGatewayBaseHandler<Input, Output> {
    handler(input: RequestInfo<Input>): Promise<Output> {
      return Promise.resolve({ status: 200 });
    }

    getAuthenticator(): IAuthenticator {
      return new JwtAuthenticator();
    }
  }

  class BaseHandlerFailedTest extends ApiGatewayBaseHandler<Input, Output> {
    handler(input: RequestInfo<Input>): Promise<Output> {
      throw new Error(`error`);
    }

    getAuthenticator(): IAuthenticator {
      return new JwtAuthenticator();
    }
  }

  class BaseHandlerFailedLambdaException extends ApiGatewayBaseHandler<
    Input,
    Output
  > {
    handler(input: RequestInfo<Input>): Promise<Output> {
      throw new LambdaException(`error`, 154, 1);
    }

    getAuthenticator(): IAuthenticator {
      return new JwtAuthenticator();
    }
  }

  test('test lambda authorized success', async () => {
    const handler: BaseHandlerTest = new BaseHandlerTest();
    const output: any = await handler.requestHandler(
      {
        name: 'juan',
      },
      context,
    );
    expect(output).not.toBeUndefined();
    expect(output.statusCode).toEqual(200);
  });

  test('test when auth token is invalid', async () => {
    const handler: BaseHandlerFailedTest = new BaseHandlerFailedTest();
    const output: any = await handler.requestHandler(
      {
        name: 'juan',
      },
      context,
    );
    expect(output).not.toBeUndefined();
    expect(output.statusCode).toEqual(400);
  });

  test('test handler lambda exception', async () => {
    const handler: BaseHandlerFailedLambdaException =
      new BaseHandlerFailedLambdaException();
    const output: any = await handler.requestHandler(
      {
        name: 'juan',
      },
      context,
    );
    expect(output).not.toBeUndefined();
    expect(output.statusCode).toEqual(154);
    expect(output.body).toEqual('{"message":"error","code":1}');
  });
});
