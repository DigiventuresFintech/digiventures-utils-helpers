import axios from 'axios';
import { WebhookAuthorizationModel } from './model/WebhookAuthorizationModel';

export class WebhookAuthorization {
    readonly API_WEBHOOKS_URL: string | undefined =
        process.env.API_WEBHOOKS_URL;
    readonly API_WEBHOOKS_DEFAULT_URL: string =
        'https://api.qa.digiventures.la';

    /**
     * Authentication method
     * @param input Api gateway request header
     */
    async authenticate(input: WebhookAuthorizationModel): Promise<any> {
        return await this.login(input);
    }

    /**
     * Method used that authenticates a request using application and secrets
     * through api tenants
     * @param input Api gateway request header
     * @private
     */
    private async login(input: WebhookAuthorizationModel): Promise<string> {
        const env = process.env.ENVIRONMENT;
        if (!env) {
            throw new Error('environment not defined');
        }

        const url = `${
            this.API_WEBHOOKS_URL || this.API_WEBHOOKS_DEFAULT_URL
        }/authorization/${input.applicationId}/${input.secret}`;

        let response = null;
        try {
            response = await axios.get(url);
        } catch (e) {
            console.error(e);
            throw new Error(`authorization error`);
        }

        if (response && response.status == 200 && response.data.authorization) {
            return response.data.authorization;
        }

        throw new Error(`authorization service response an unknown error`);
    }
}
