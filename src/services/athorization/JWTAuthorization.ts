import {UnauthorizedError} from "./error/errors";
import jwt from 'jsonwebtoken';

interface JWTPayload {
    [key: string]:   string
    expiration:      string
}

export class JWTAuthorization {
    readonly tokenSecret: string

    /**
     * @param _secret JWT secret token
     */
    constructor(_secret: string) {
        this.tokenSecret = _secret
    }

    /**
     * Verify a JWT token generated and validates if it is not expired
     * @param token Generated JWT
     */
    public verify(token: string): any {
        if (!token) throw new Error(`token not defined`)

        let payload:JWTPayload
        try {
            payload = <JWTPayload>jwt.verify(token, this.tokenSecret);
        } catch (e) {
            console.error("jwt verification error", e)
            if (e instanceof jwt.JsonWebTokenError ||
                e instanceof jwt.TokenExpiredError) {
                throw new UnauthorizedError()
            }
            throw new Error(`jwt cannot be verified`)
        }

        return payload
    }

    /**
     * Generate a JWT with expiration as payload param
     */
    public sign(payload: any): string {
        return jwt.sign(payload,
            this.tokenSecret,
            { expiresIn: "2h" }
        )
    }
}