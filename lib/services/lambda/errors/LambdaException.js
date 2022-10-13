"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LambdaException = void 0;
class LambdaException extends Error {
    constructor(message, internalError = 400, body = null) {
        super();
        this.name = "LambdaException";
        this.message = message;
        this._internalError = internalError;
        this._body = body;
        Object.setPrototypeOf(this, LambdaException.prototype);
    }
    get internalError() {
        return this._internalError;
    }
    get body() {
        return this._body;
    }
    get trace() {
        return `[TRACE] [EXCEPTION] message: {${this.message}} InternalError {${this.internalError}} Body {${this._body}}`;
    }
    /**
     * This method generate an error response using a custom lambda exception
     * @private
     */
    get buildApiResponse() {
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
exports.LambdaException = LambdaException;
