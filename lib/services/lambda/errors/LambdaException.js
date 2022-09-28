"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LambdaException = void 0;
class LambdaException extends Error {
    constructor(message, internalError = 400, body = null) {
        super(message);
        this._internalError = internalError;
        this._body = body;
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
}
exports.LambdaException = LambdaException;
