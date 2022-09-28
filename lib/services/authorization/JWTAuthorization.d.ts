import { JWTAbstractAuthorization } from './JWTAbstractAuthorization';
export declare class JWTAuthorization extends JWTAbstractAuthorization {
    /**
     * Constructor class calls super method assigning
     * JWT secret token loaded by secret manager on
     * project startup
     */
    constructor();
}
