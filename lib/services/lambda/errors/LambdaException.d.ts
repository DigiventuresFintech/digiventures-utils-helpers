import { APIGatewayProxyResult } from 'aws-lambda';
export declare class LambdaException extends Error {
    private readonly _internalError;
    private readonly _body;
    constructor(message: string, internalError?: number, body?: any);
    get internalError(): number;
    get body(): any;
    get trace(): string;
    /**
     * This method generate an error response using a custom lambda exception
     * @private
     */
    get buildApiResponse(): APIGatewayProxyResult;
}
