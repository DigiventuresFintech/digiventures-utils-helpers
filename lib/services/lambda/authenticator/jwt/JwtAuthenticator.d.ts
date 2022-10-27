import { IAuthenticator } from '../IAuthenticator';
import { JWTAuthorization } from '../../../authorization/JWTAuthorization';
import { APIGatewayProxyEvent } from 'aws-lambda';
export declare class JwtAuthenticator implements IAuthenticator {
    readonly authorizer: JWTAuthorization;
    constructor();
    authenticate(input: APIGatewayProxyEvent): void;
}
