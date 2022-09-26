export declare class JWTAuthorization {
    readonly tokenSecret: string;
    /**
     * @param _secret JWT secret token
     */
    constructor(_secret: string);
    /**
     * Verify a JWT token generated and validates if it is not expired
     * @param token Generated JWT
     */
    verify(token: string): any;
    /**
     * Generate a JWT with expiration as payload param
     */
    sign(payload: any): string;
}
