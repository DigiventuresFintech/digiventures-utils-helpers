import { APIGatewayProxyEventHeaders } from 'aws-lambda/trigger/api-gateway-proxy';
import { IAuthenticator } from '../IAuthenticator';
import axios from 'axios';

export class WebhookAuthenticator implements IAuthenticator {
    readonly authUrl: { [index: string]: any } = {
        prod: '',
        dev: '',
        local: '',
    };

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
        if (
            !input.hasOwnProperty('applicationId') ||
            !input.hasOwnProperty('secret')
        ) {
            throw new Error('authentication headers not defined');
        }

        const baseUrl: string =
            this.authUrl[env.toLowerCase()] || this.authUrl.local;
        const url = `${baseUrl.trim()}/authorization/${
            input['applicationId']
        }/${input['secret']}`;

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
