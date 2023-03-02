import { RequestInfo } from './RequestInfo';
import {
    APIGatewayProxyEventHeaders,
    APIGatewayProxyEventQueryStringParameters,
} from 'aws-lambda/trigger/api-gateway-proxy';

export class ApiGatewayRequestInfo<B> extends RequestInfo<B> {
    private readonly _headers: APIGatewayProxyEventHeaders;
    private readonly _queryStringParameters: APIGatewayProxyEventQueryStringParameters | null;

    constructor(
        body: B,
        headers: APIGatewayProxyEventHeaders,
        queryStringParameters: APIGatewayProxyEventQueryStringParameters | null,
    ) {
        super(body);
        this._headers = headers;
        this._queryStringParameters = queryStringParameters;
    }

    get headers(): APIGatewayProxyEventHeaders {
        return this._headers;
    }

    get queryStringParameters():
        | APIGatewayProxyEventQueryStringParameters
        | null {
        return this._queryStringParameters;
    }
}
