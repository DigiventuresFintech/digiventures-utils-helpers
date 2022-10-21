import { IAuthenticator } from '../IAuthenticator';
import { APIGatewayProxyEvent } from 'aws-lambda';
export declare class WebhookAuthenticator implements IAuthenticator {
    readonly API_WEBHOOKS_URL: string | undefined;
    /**
     * Authentication method
     * @param input Api gateway request header
     */
    authenticate(input: APIGatewayProxyEvent): Promise<any>;
    /**
     * Method used that authenticates a request using application and secrets
     * through api tenants
     * @param input Api gateway request header
     * @private
     */
    private login;
}
