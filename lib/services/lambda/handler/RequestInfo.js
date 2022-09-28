"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestInfo = void 0;
class RequestInfo {
    constructor(body, headers, queryStringParameters) {
        this._body = body;
        this._headers = headers;
        this._queryStringParameters = queryStringParameters;
    }
    get body() {
        return this._body;
    }
    get headers() {
        return this._headers;
    }
    get queryStringParameters() {
        return this._queryStringParameters;
    }
}
exports.RequestInfo = RequestInfo;
