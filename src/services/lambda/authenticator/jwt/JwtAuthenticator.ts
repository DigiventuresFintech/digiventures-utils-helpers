import { IAuthenticator } from '../IAuthenticator';
import { APIGatewayProxyEventHeaders } from 'aws-lambda/trigger/api-gateway-proxy';
import { JWTAuthorization } from '../../../authorization/JWTAuthorization';
import { APIGatewayProxyEvent } from 'aws-lambda';

export class JwtAuthenticator implements IAuthenticator {
    readonly authorizer: JWTAuthorization;

    constructor() {
        this.authorizer = new JWTAuthorization();
    }

    authenticate(input: APIGatewayProxyEvent): void {
        const authToken: string | undefined =
            (input.headers.authorization as string) ||
            (input.headers.Authorization as string);
        if (!authToken) {
            throw new Error('authorization header not defined');
        }

        try {
            this.authorizer.verify(authToken);
        } catch (e) {
            throw e;
        }
    }
}
