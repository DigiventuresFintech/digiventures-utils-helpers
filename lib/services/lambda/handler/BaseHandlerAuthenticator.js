"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseHandlerAuthenticator = void 0;
const RequestInfo_1 = require("./RequestInfo");
const LambdaException_1 = require("../errors/LambdaException");
class BaseHandlerAuthenticator {
    /**
     * Main method that be used as lambda entry point
     * @param event Lambda input
     */
    async requestHandler(event) {
        const body = JSON.parse(event.body || '');
        const request = new RequestInfo_1.RequestInfo(body, event.headers, event.queryStringParameters);
        const auth = this.getAuthenticator();
        if (auth) {
            try {
                await auth.authenticate(request.headers);
            }
            catch (e) {
                return this.buildGatewayError(401, 'Unauthorized');
            }
        }
        try {
            const output = await this.handler(request);
            return {
                statusCode: 200,
                body: JSON.stringify(output),
            };
        }
        catch (e) {
            if (e instanceof LambdaException_1.LambdaException) {
                console.error(e.trace);
                return this.buildLambdaException(e);
            }
            return this.buildExceptionError(e);
        }
    }
    /**
     * Method for build a formatted error
     * @param e exception data
     * @private
     */
    buildExceptionError(e) {
        return {
            statusCode: e.code ? e.code : 400,
            body: JSON.stringify({
                message: e.message ? e.message : 'Unknown error',
            }),
        };
    }
    /**
     * This method generate an error response using a custom lambda exception
     * @param e exception data
     * @private
     */
    buildLambdaException(e) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: e.message ? e.message : 'Unknown error',
                internalError: e.internalError ? e.internalError : '',
                body: e.body ? JSON.stringify(e.body) : '',
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
    buildGatewayError(code, message) {
        return {
            statusCode: code,
            body: JSON.stringify({
                message: message,
            }),
        };
    }
}
exports.BaseHandlerAuthenticator = BaseHandlerAuthenticator;
