"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTAuthorization = void 0;
const errors_1 = require("./error/errors");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JWTAuthorization {
    /**
     * @param _secret JWT secret token
     */
    constructor(_secret) {
        this.tokenSecret = _secret;
    }
    /**
     * Verify a JWT token generated and validates if it is not expired
     * @param token Generated JWT
     */
    verify(token) {
        if (!token)
            throw new Error(`token not defined`);
        let payload;
        try {
            payload = jsonwebtoken_1.default.verify(token, this.tokenSecret);
        }
        catch (e) {
            console.error("jwt verification error", e);
            if (e instanceof jsonwebtoken_1.default.JsonWebTokenError ||
                e instanceof jsonwebtoken_1.default.TokenExpiredError) {
                throw new errors_1.UnauthorizedError();
            }
            throw new Error(`jwt cannot be verified`);
        }
        return payload;
    }
    /**
     * Generate a JWT with expiration as payload param
     */
    sign(payload) {
        return jsonwebtoken_1.default.sign(payload, this.tokenSecret, { expiresIn: "2h" });
    }
}
exports.JWTAuthorization = JWTAuthorization;
