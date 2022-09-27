"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTAuthorization = void 0;
const JWTAbstractAuthorization_1 = require("./JWTAbstractAuthorization");
class JWTAuthorization extends JWTAbstractAuthorization_1.JWTAbstractAuthorization {
    constructor() {
        super(process.env.JWT_SECRET_TOKEN);
    }
}
exports.JWTAuthorization = JWTAuthorization;
