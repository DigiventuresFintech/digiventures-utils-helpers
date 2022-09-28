import { JWTAbstractAuthorization } from "./JWTAbstractAuthorization";

export class JWTAuthorization extends JWTAbstractAuthorization {

    /**
     * Constructor class calls super method assigning
     * JWT secret token loaded by secret manager on
     * project startup
     */
    constructor() {
      super(process.env.JWT_SECRET_TOKEN as string);
    }

}