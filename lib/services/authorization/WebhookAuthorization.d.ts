import { WebhookAuthorizationModel } from './model/WebhookAuthorizationModel';
export declare class WebhookAuthorization {
    readonly authUrl: {
        [index: string]: any;
    };
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
