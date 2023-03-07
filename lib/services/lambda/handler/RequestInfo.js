"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestInfo = void 0;
class RequestInfo {
    constructor(body) {
        this._body = body;
    }
    get body() {
        return this._body;
    }
}
exports.RequestInfo = RequestInfo;
