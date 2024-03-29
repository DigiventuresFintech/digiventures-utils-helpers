import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { IRequestHandler } from './IRequestHandler';
import { IAuthenticator } from '../authenticator/IAuthenticator';
import { ApiGatewayRequestInfo } from './ApiGatewayRequestInfo';
export declare abstract class BaseHandlerAuthenticator<I, O> implements IRequestHandler<APIGatewayProxyEvent, APIGatewayProxyResult> {
    /**
     * Main method that be used as lambda entry point
     * @param event Lambda input
     */
    requestHandler: (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>;
    /**
     * Base handler function
     * @param input value that be used as input
     */
    abstract handler(input: ApiGatewayRequestInfo<I>): Promise<O>;
    /**
     * Method for build a formatted error
     * @param e exception data
     * @private
     */
    private buildExceptionError;
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
    private buildGatewayError;
    /**
     * Authenticator definition
     */
    abstract getAuthenticator(): IAuthenticator | undefined;
}
