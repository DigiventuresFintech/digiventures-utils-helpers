import { WebhookAuthorizationModel } from './model/WebhookAuthorizationModel';
export declare class WebhookAuthorization {
    readonly API_WEBHOOKS_URL: string | undefined;
    readonly API_WEBHOOKS_DEFAULT_URL: string;
    /**
     * Authentication method
     * @param input Api gateway request header
     */
    authenticate(input: WebhookAuthorizationModel): Promise<any>;
    /**
     * Method used that authenticates a request using application and secrets
     * through api tenants
     * @param input Api gateway request header
     * @private
     */
    private login;
}
