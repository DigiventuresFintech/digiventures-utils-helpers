import 'dotenv/config';
import {
  BaseHandlerAuthenticator,
  JwtAuthenticator,
  JWTAuthorization,
  LambdaException,
} from '../../../src';
import { IAuthenticator } from '../../../src';
import { RequestInfo } from '../../../src';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

describe('Base handler suite', function () {
  beforeEach(() => {
    process.env.JWT_SECRET_TOKEN =
      'bf4c1a0d46b76bd5210f8ffa9f810f1a6c9a2318b23a4acf385d4cfca6f58397';
  });

  interface Input {
    name: string;
  }

  interface Output {
    status: number;
  }

  class BaseHandlerTest extends BaseHandlerAuthenticator<Input, Output> {
    handler(input: RequestInfo<Input>): Promise<Output> {
      return Promise.resolve({ status: 200 });
    }

    getAuthenticator(): IAuthenticator {
      return new JwtAuthenticator();
    }
  }

  class BaseHandlerFailedTest extends BaseHandlerAuthenticator<Input, Output> {
    handler(input: RequestInfo<Input>): Promise<Output> {
      throw new Error(`error`);
    }

    getAuthenticator(): IAuthenticator {
      return new JwtAuthenticator();
    }
  }

  class BaseHandlerFailedLambdaException extends BaseHandlerAuthenticator<
    Input,
    Output
  > {
    handler(input: RequestInfo<Input>): Promise<Output> {
      throw new LambdaException(`error`, 154, { name: 'juan' });
    }

    getAuthenticator(): IAuthenticator {
      return new JwtAuthenticator();
    }
  }

  const getEvent = () => {
    const input = {
      name: 'Juan',
    };
    const event: APIGatewayProxyEvent = {
      httpMethod: 'get',
      body: JSON.stringify(input),
      headers: {
        Authorization: new JWTAuthorization().sign({}),
      },
      isBase64Encoded: false,
      multiValueHeaders: {},
      multiValueQueryStringParameters: {},
      path: '/hello',
      pathParameters: {},
      queryStringParameters: {},
      requestContext: {
        accountId: '123456789012',
        apiId: '1234',
        authorizer: {},
        httpMethod: 'get',
        identity: {
          accessKey: '',
          accountId: '',
          apiKey: '',
          apiKeyId: '',
          caller: '',
          clientCert: {
            clientCertPem: '',
            issuerDN: '',
            serialNumber: '',
            subjectDN: '',
            validity: { notAfter: '', notBefore: '' },
          },
          cognitoAuthenticationProvider: '',
          cognitoAuthenticationType: '',
          cognitoIdentityId: '',
          cognitoIdentityPoolId: '',
          principalOrgId: '',
          sourceIp: '',
          user: '',
          userAgent: '',
          userArn: '',
        },
        path: '/hello',
        protocol: 'HTTP/1.1',
        requestId: 'c6af9ac6-7b61-11e6-9a41-93e8deadbeef',
        requestTimeEpoch: 1428582896000,
        resourceId: '123456',
        resourcePath: '/hello',
        stage: 'dev',
      },
      resource: '',
      stageVariables: {},
    };
    return event;
  };

  test('test lambda authorized success', async () => {
    const baseEvent: APIGatewayProxyEvent = Object.assign({}, this.getEvent());
    const handler: BaseHandlerTest = new BaseHandlerTest();
    const output: APIGatewayProxyResult = await handler.requestHandler(
      baseEvent,
    );
    expect(output).not.toBeUndefined();
    expect(output.statusCode).toEqual(200);
    expect(output.body).toEqual('{"status":200}');
  });

  test('test when auth token is invalid', async () => {
    let baseEvent: APIGatewayProxyEvent = Object.assign({}, this.getEvent());
    baseEvent.headers = {};

    const handler: BaseHandlerTest = new BaseHandlerTest();
    const output: APIGatewayProxyResult = await handler.requestHandler(
      baseEvent,
    );
    expect(output).not.toBeUndefined();
    expect(output.statusCode).toEqual(401);
    expect(output.body).toEqual('{"message":"Unauthorized"}');
  });

  test('test when jwt token is invalid', async () => {
    let baseEvent: APIGatewayProxyEvent = Object.assign({}, this.getEvent());
    baseEvent.headers = {
      Authorization: '1234',
    };

    const handler: BaseHandlerTest = new BaseHandlerTest();
    const output: APIGatewayProxyResult = await handler.requestHandler(
      baseEvent,
    );
    expect(output).not.toBeUndefined();
    expect(output.statusCode).toEqual(401);
    expect(output.body).toEqual('{"message":"Unauthorized"}');
  });

  test('test handler error propagation', async () => {
    const baseEvent: APIGatewayProxyEvent = Object.assign({}, this.getEvent());
    const handler: BaseHandlerFailedTest = new BaseHandlerFailedTest();
    const output: APIGatewayProxyResult = await handler.requestHandler(
      baseEvent,
    );
    expect(output).not.toBeUndefined();
    expect(output.statusCode).toEqual(400);
    expect(output.body).toEqual('{"message":"error"}');
  });

  test('test handler lambda exception', async () => {
    const baseEvent: APIGatewayProxyEvent = Object.assign({}, this.getEvent());
    const handler: BaseHandlerFailedLambdaException =
      new BaseHandlerFailedLambdaException();
    const output: APIGatewayProxyResult = await handler.requestHandler(
      baseEvent,
    );
    expect(output).not.toBeUndefined();
    expect(output.statusCode).toEqual(400);
    expect(output.body).toEqual(
      '{"message":"error","internalError":154,"body":"{\\"name\\":\\"juan\\"}"}',
    );
  });
});
