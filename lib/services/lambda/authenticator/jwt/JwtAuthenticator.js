"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthenticator = void 0;
const JWTAuthorization_1 = require("../../../authorization/JWTAuthorization");
class JwtAuthenticator {
    constructor() {
        this.authorizer = new JWTAuthorization_1.JWTAuthorization();
        this.authData = null;
    }
    authenticate(input) {
        const authToken = input.headers.authorization ||
            input.headers.Authorization;
        if (!authToken) {
            throw new Error('authorization header not defined');
        }
        try {
            this.authData = this.authorizer.verify(authToken);
        }
        catch (e) {
            throw e;
        }
    }
    getAuthData() {
        if (this.authData == null) {
            throw new Error('unauthorized');
        }
        return this.authData;
    }
}
exports.JwtAuthenticator = JwtAuthenticator;
