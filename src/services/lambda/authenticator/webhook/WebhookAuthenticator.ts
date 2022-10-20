import { APIGatewayProxyEventHeaders } from 'aws-lambda/trigger/api-gateway-proxy';
import { IAuthenticator } from '../IAuthenticator';
import axios from 'axios';

export class WebhookAuthenticator implements IAuthenticator {
    readonly API_WEBHOOKS_URL: string | undefined =
        process.env.API_WEBHOOKS_URL;

    /**
     * Authentication method
     * @param input Api gateway request header
     */
    async authenticate(input: APIGatewayProxyEventHeaders): Promise<any> {
        return await this.login(input);
    }

    /**
     * Method used that authenticates a request using application and secrets
     * through api tenants
     * @param input Api gateway request header
     * @private
     */
    private async login(input: APIGatewayProxyEventHeaders): Promise<string> {
        const env = process.env.ENVIRONMENT;
        if (!env) {
            throw new Error('environment not defined');
        }
        if (!this.API_WEBHOOKS_URL) {
            throw new Error('authentication webhook url not defined');
        }
        if (
            !input.hasOwnProperty('applicationId') ||
            !input.hasOwnProperty('secret')
        ) {
            throw new Error('authentication headers not defined');
        }

        const url = `${this.API_WEBHOOKS_URL}/authorization/${input['applicationId']}/${input['secret']}`;

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
