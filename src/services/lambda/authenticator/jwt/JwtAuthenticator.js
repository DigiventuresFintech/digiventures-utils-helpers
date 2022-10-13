"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthenticator = void 0;
const JWTAuthorization_1 = require("../../../authorization/JWTAuthorization");
class JwtAuthenticator {
    constructor() {
        this.authorizer = new JWTAuthorization_1.JWTAuthorization();
    }
    authenticate(input) {
        const authToken = input.authorization || input.Authorization;
        if (!authToken) {
            throw new Error('authorization header not defined');
        }
        try {
            this.authorizer.verify(authToken);
        }
        catch (e) {
            throw e;
        }
    }
}
exports.JwtAuthenticator = JwtAuthenticator;
//# sourceMappingURL=JwtAuthenticator.js.map