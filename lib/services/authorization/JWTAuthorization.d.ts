import { JWTBaseAuthorization } from './JWTBaseAuthorization';
export declare class JWTAuthorization extends JWTBaseAuthorization {
    /**
     * Constructor class calls super method assigning
     * JWT secret token loaded by secret manager on
     * project startup
     */
    constructor();
}
