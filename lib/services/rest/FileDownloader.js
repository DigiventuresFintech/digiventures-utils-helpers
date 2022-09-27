"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JWTAbstractAuthorization_1 = require("../athorization/JWTAbstractAuthorization");
class FileDownloader extends JWTAbstractAuthorization_1.JWTAbstractAuthorization {
    /**
     * Constructor class calls super method assigning
     * JWT secret token loaded by secret manager on
     * project startup
     */
    constructor() {
        super(process.env.JWT_SECRET_TOKEN);
    }
}
