import { JWTBaseAuthorization } from './JWTBaseAuthorization';

export class JWTAuthorization extends JWTBaseAuthorization {
    /**
     * Constructor class calls super method assigning
     * JWT secret token loaded by secret manager on
     * project startup
     */
    constructor() {
        super(process.env.JWT_SECRET_TOKEN as string);
    }
}
