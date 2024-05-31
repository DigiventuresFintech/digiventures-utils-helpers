"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTAuthorization = void 0;
const errors_1 = require("./error/errors");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JWTAuthorization {
    constructor(_token) {
        this.token = _token || process.env.JWT_SECRET_TOKEN;
    }
    verify(token, secret) {
        if (!token)
            throw new Error(`token not defined`);
        let payload;
        try {
            payload = jsonwebtoken_1.default.verify(token, secret || this.token);
        }
        catch (e) {
            console.error('jwt verification error', e);
            if (e instanceof jsonwebtoken_1.default.JsonWebTokenError ||
                e instanceof jsonwebtoken_1.default.TokenExpiredError) {
                throw new errors_1.UnauthorizedError();
            }
            throw new Error(`jwt cannot be verified`);
        }
        return payload;
    }
    sign(payload, secret) {
        return jsonwebtoken_1.default.sign(payload, secret || this.token, { expiresIn: '2h' });
    }
}
exports.JWTAuthorization = JWTAuthorization;
//# sourceMappingURL=JWTAuthorization.js.map