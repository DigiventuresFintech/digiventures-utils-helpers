import { IAuthenticator } from '../IAuthenticator';
import { APIGatewayProxyEventHeaders } from 'aws-lambda/trigger/api-gateway-proxy';
import { JWTAuthorization } from '../../../authorization/JWTAuthorization';
export declare class JwtAuthenticator implements IAuthenticator {
    readonly authorizer: JWTAuthorization;
    constructor();
    authenticate(input: APIGatewayProxyEventHeaders): void;
}
