import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { IRequestHandler } from './IRequestHandler';
import { RequestInfo } from './RequestInfo';
import { IAuthenticator } from '../authenticator/IAuthenticator';
import { LambdaException } from '../errors/LambdaException';

export abstract class BaseHandlerAuthenticator<I, O>
    implements IRequestHandler<APIGatewayProxyEvent, APIGatewayProxyResult>
{
    /**
     * Main method that be used as lambda entry point
     * @param event Lambda input
     */
    async requestHandler(
        event: APIGatewayProxyEvent,
    ): Promise<APIGatewayProxyResult> {
        const body: I = JSON.parse(event.body || '');
        const request: RequestInfo<I> = new RequestInfo(
            body,
            event.headers,
            event.queryStringParameters,
        );

        const auth = this.getAuthenticator();
        if (auth) {
            try {
                await auth.authenticate(request.headers);
            } catch (e) {
                return this.buildGatewayError(401, 'Unauthorized');
            }
        }

        try {
            const output: O = await this.handler(request);
            return {
                statusCode: 200,
                body: JSON.stringify(output),
            };
        } catch (error: any) {
            if (error instanceof LambdaException) {
                console.error(error.trace);
                return error.buildApiResponse;
            }
            return this.buildExceptionError(error);
        }
    }

    /**
     * Base handler function
     * @param input value that be used as input
     */
    abstract handler(input: RequestInfo<I>): Promise<O>;

    /**
     * Method for build a formatted error
     * @param e exception data
     * @private
     */
    private buildExceptionError(e: any): APIGatewayProxyResult {
        return {
            statusCode: e.code ? e.code : 400,
            body: JSON.stringify({
                message: e.message ? e.message : 'Unknown error',
            }),
        };
    }

    /**
     * Build api gateway error response
     * @param code http status code
     * @param message response message
     *
     * HTTP status codes helper
     * https://developer.mozilla.org/es/docs/Web/HTTP/Status
     *
     * @private
     */
    private buildGatewayError(
        code: number,
        message: string,
    ): APIGatewayProxyResult {
        return {
            statusCode: code,
            body: JSON.stringify({
                message: message,
            }),
        };
    }

    /**
     * Authenticator definition
     */
    abstract getAuthenticator(): IAuthenticator;
}
