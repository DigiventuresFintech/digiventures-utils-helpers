"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseHandlerAuthenticator = void 0;
const RequestInfo_1 = require("./RequestInfo");
const LambdaException_1 = require("../errors/LambdaException");
class BaseHandlerAuthenticator {
    constructor() {
        /**
         * Main method that be used as lambda entry point
         * @param event Lambda input
         */
        this.requestHandler = async (event) => {
            const body = JSON.parse(event.body || '');
            const request = new RequestInfo_1.RequestInfo(body, event.headers, event.queryStringParameters);
            console.log('input received', event.body);
            const auth = this.getAuthenticator();
            if (auth) {
                console.log('using authenticator');
                try {
                    await auth.authenticate(request.headers);
                }
                catch (e) {
                    console.error('service unauthorized', e);
                    return this.buildGatewayError(401, 'Unauthorized');
                }
            }
            try {
                const output = await this.handler(request);
                const response = JSON.stringify(output);
                console.log('lambda generates output', response);
                return {
                    statusCode: 200,
                    body: response,
                };
            }
            catch (error) {
                console.error('lambda execution error', error);
                if (error instanceof LambdaException_1.LambdaException) {
                    console.error(error.trace);
                    return error.buildApiResponse;
                }
                return this.buildExceptionError(error);
            }
        };
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
