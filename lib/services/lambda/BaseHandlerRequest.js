"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseHandlerRequest = void 0;
class BaseHandlerRequest {
    async handlerRequest(input) {
        if (!input.body) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: `Body not defined`,
                }),
            };
        }
        let bodyInput = JSON.parse(input.body);
        let handlerResult;
        try {
            handlerResult = await this.Handler(bodyInput);
        }
        catch (e) {
            console.error(`Base Handler error `, e);
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: e,
                }),
            };
        }
        return {
            statusCode: 200,
            body: JSON.stringify(handlerResult),
        };
    }
}
exports.BaseHandlerRequest = BaseHandlerRequest;
