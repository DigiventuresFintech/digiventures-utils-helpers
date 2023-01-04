import { IAuthenticator } from '../IAuthenticator';
import { JWTAuthorization } from '../../../authorization/JWTAuthorization';
import { APIGatewayProxyEvent } from 'aws-lambda';
export declare class JwtAuthenticator implements IAuthenticator {
    readonly authorizer: JWTAuthorization;
    private authData;
    constructor();
    authenticate(input: APIGatewayProxyEvent): void;
    getAuthData(): any;
}
