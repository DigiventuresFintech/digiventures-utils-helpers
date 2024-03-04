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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseHandlerAuthenticator = void 0;
const utils_1 = __importDefault(require("../../authorization/error/utils"));
const ApiGatewayRequestInfo_1 = require("./ApiGatewayRequestInfo");
class BaseHandlerAuthenticator {
    constructor() {
        /**
         * Main method that be used as lambda entry point
         * @param event Lambda input
         */
        this.requestHandler = (event) => __awaiter(this, void 0, void 0, function* () {
            const body = JSON.parse(event.body || '{}');
            const request = new ApiGatewayRequestInfo_1.ApiGatewayRequestInfo(body, event.headers, event.queryStringParameters);
            console.log('input received', event.body);
            const auth = this.getAuthenticator();
            if (auth) {
                console.log('using authenticator');
                try {
                    yield auth.authenticate(event);
                }
                catch (e) {
                    console.error('service unauthorized', e);
                    return this.buildGatewayError(401, 'Unauthorized');
                }
            }
            try {
                const output = yield this.handler(request);
                const response = JSON.stringify(output);
                console.log('lambda generates output', response);
                return {
                    statusCode: 200,
                    body: response,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    },
                };
            }
            catch (error) {
                console.error('lambda execution error', error);
                if ((0, utils_1.default)(error)) {
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