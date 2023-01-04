"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Determines whether the payload contains LambdaException
 * class name
 * @param payload
 */
function isLambdaError(payload) {
    return payload.name == "LambdaException";
}
exports.default = isLambdaError;
