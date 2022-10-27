export declare class JWTBaseAuthorization {
    readonly token: string;
    constructor(_token: string);
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
