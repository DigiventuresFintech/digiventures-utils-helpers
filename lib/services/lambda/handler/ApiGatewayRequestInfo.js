"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiGatewayRequestInfo = void 0;
const RequestInfo_1 = require("./RequestInfo");
class ApiGatewayRequestInfo extends RequestInfo_1.RequestInfo {
    constructor(body, headers, queryStringParameters) {
        super(body);
        this._headers = headers;
        this._queryStringParameters = queryStringParameters;
    }
    get headers() {
        return this._headers;
    }
    get queryStringParameters() {
        return this._queryStringParameters;
    }
}
exports.ApiGatewayRequestInfo = ApiGatewayRequestInfo;
