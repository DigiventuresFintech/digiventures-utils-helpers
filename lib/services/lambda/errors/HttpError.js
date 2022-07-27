"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
class HttpError extends Error {
    constructor(message, statusCode = 500, body = null) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.body = body;
        /**
         * If this is set to true the error should be reported back to the client.
         * @type {boolean}
         */
        this.passthrough = true;
    }
}
exports.HttpError = HttpError;
