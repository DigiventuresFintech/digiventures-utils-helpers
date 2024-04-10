import { IAuthenticator } from '../IAuthenticator';
import axios from 'axios';
import { APIGatewayProxyEvent } from 'aws-lambda';

export class WebhookAuthenticator implements IAuthenticator {
  private authData: any;

  readonly API_WEBHOOKS_URL: string | undefined = process.env.API_WEBHOOKS_URL;

  constructor() {
    this.authData = null;
  }

  /**
   * Authentication method
   * @param input Api gateway request header
   */
  async authenticate(input: APIGatewayProxyEvent): Promise<any> {
    return await this.login(input);
  }

  /**
   * Method used that authenticates a request using application and secrets
   * through api tenants
   * @param input Api gateway request header
   * @private
   */
  private async login(input: APIGatewayProxyEvent): Promise<string> {
    const env = process.env.ENVIRONMENT;
    if (!env) {
      throw new Error('environment not defined');
    }
    if (!this.API_WEBHOOKS_URL) {
      throw new Error('authentication webhook url not defined');
    }
    const appId: string | undefined =
      input.headers.app_id ||
      (input.queryStringParameters
        ? input.queryStringParameters.app_id
        : undefined);
    const secretToken: string | undefined =
      input.headers.secret_token ||
      (input.queryStringParameters
        ? input.queryStringParameters.secret_token
        : undefined);
    if (!appId || !secretToken) {
      throw new Error('authentication headers not defined');
    }

    const url = `${this.API_WEBHOOKS_URL}/authorization/${appId}/${secretToken}`;
    let response = null;
    try {
      response = await axios.get(url);
    } catch (e) {
      console.error(e);
      throw new Error(`authorization error`);
    }

    this.authData = response.data;
    if (response && response.status == 200 && response.data.authorization) {
      return response.data.authorization;
    }

    throw new Error(`authorization service response an unknown error`);
  }

  getAuthData(): any {
    return this.authData;
  }
}
