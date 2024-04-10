import { APIGatewayProxyEvent } from 'aws-lambda';

export interface IAuthenticator {
  /**
   * Method used for implements different types of
   * authentication methods
   * @param input Input necessary to authenticate a request
   */
  authenticate(input: APIGatewayProxyEvent): any;

  /**
   * Authorization data getter
   */
  getAuthData(): any;
}
