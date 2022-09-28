import { APIGatewayProxyEventHeaders } from 'aws-lambda/trigger/api-gateway-proxy';
import { IAuthenticator } from '../IAuthenticator';
export declare class WebhookAuthenticator implements IAuthenticator {
    readonly authUrl: {
        [index: string]: any;
    };
    /**
     * Authentication method
     * @param input Api gateway request header
     */
    authenticate(input: APIGatewayProxyEventHeaders): Promise<any>;
    /**
     * Method used that authenticates a request using application and secrets
     * through api tenants
     * @param input Api gateway request header
     * @private
     */
    private login;
}
