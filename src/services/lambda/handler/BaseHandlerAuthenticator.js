"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseHandlerAuthenticator = void 0;
const RequestInfo_1 = require("./RequestInfo");
const LambdaException_1 = require("../errors/LambdaException");
class BaseHandlerAuthenticator {
    /**
     * Main method that be used as lambda entry point
     * @param event Lambda input
     */
    requestHandler(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = JSON.parse(event.body || '');
            const request = new RequestInfo_1.RequestInfo(body, event.headers, event.queryStringParameters);
            const auth = this.getAuthenticator();
            if (auth) {
                try {
                    yield auth.authenticate(request.headers);
                }
                catch (e) {
                    return this.buildGatewayError(401, 'Unauthorized');
                }
            }
            try {
                const output = yield this.handler(request);
                return {
                    statusCode: 200,
                    body: JSON.stringify(output),
                };
            }
            catch (error) {
                if (error instanceof LambdaException_1.LambdaException) {
                    console.error(error.trace);
                    return error.buildApiResponse;
                }
                return this.buildExceptionError(error);
            }
        });
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
//# sourceMappingURL=BaseHandlerAuthenticator.js.map