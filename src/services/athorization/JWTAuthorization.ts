import { JWTAbstractAuthorization } from "./JWTAbstractAuthorization";

export class JWTAuthorization extends JWTAbstractAuthorization {

    constructor() {
      super(process.env.JWT_SECRET_TOKEN as string);
    }

}