import { IAuthenticator } from '../IAuthenticator';
import { JWTAuthorization } from '../../../authorization/JWTAuthorization';
import { APIGatewayProxyEvent } from 'aws-lambda';

export class JwtAuthenticator implements IAuthenticator {
    readonly authorizer: JWTAuthorization;
    private authData: any;

    constructor() {
        this.authorizer = new JWTAuthorization();
        this.authData = null;
    }

    authenticate(input: APIGatewayProxyEvent): void {
        const authToken: string | undefined =
            (input.headers.authorization as string) ||
            (input.headers.Authorization as string);
        if (!authToken) {
            throw new Error('authorization header not defined');
        }

        try {
            this.authData = this.authorizer.verify(authToken);
        } catch (e) {
            throw e;
        }
    }

    getAuthData(): any {
        if (this.authData == null) {
            throw new Error('unauthorized');
        }
        return this.authData;
    }
}
