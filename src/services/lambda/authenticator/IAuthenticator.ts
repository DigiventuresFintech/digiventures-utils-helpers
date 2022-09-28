import { APIGatewayProxyEventHeaders } from 'aws-lambda/trigger/api-gateway-proxy';

export interface IAuthenticator {
    /**
     * Method used for implements different types of
     * authentication methods
     * @param input Input necessary to authenticate a request
     */
    authenticate(input: APIGatewayProxyEventHeaders): any;
}
