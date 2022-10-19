import { APIGatewayProxyResult } from 'aws-lambda';

export class LambdaException extends Error {
    private readonly _internalError: number;
    private readonly _body: any;

    constructor(
        message: string,
        internalError: number = 400,
        body: any = null,
    ) {
        super();
        this.name = 'LambdaException';
        this.message = message;
        this._internalError = internalError;
        this._body = body;
        Object.setPrototypeOf(this, LambdaException.prototype);
    }

    get internalError(): number {
        return this._internalError;
    }

    get body(): any {
        return this._body;
    }

    get trace(): string {
        return `[TRACE] [EXCEPTION] message: {${this.message}} InternalError {${this.internalError}} Body {${this._body}}`;
    }

    /**
     * This method generate an error response using a custom lambda exception
     * @private
     */
    get buildApiResponse(): APIGatewayProxyResult {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: this.message ? this.message : 'Unknown error',
                internalError: this.internalError ? this.internalError : '',
                body: this.body ? JSON.stringify(this.body) : '',
            }),
        };
    }
}
