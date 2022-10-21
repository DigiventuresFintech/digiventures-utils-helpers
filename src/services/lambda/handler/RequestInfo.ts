import {
    APIGatewayProxyEventHeaders,
    APIGatewayProxyEventQueryStringParameters,
} from 'aws-lambda/trigger/api-gateway-proxy';
import { RequestDataBody } from "./RequestDataBody";

export class RequestInfo<B extends RequestDataBody> {
    private readonly _body: B;
    private readonly _headers: APIGatewayProxyEventHeaders;
    private readonly _queryStringParameters: APIGatewayProxyEventQueryStringParameters | null;

    constructor(
        body: B,
        headers: APIGatewayProxyEventHeaders,
        queryStringParameters: APIGatewayProxyEventQueryStringParameters | null,
    ) {
        this._body = body;
        this._headers = headers;
        this._queryStringParameters = queryStringParameters;
    }

    get body(): B {
        return this._body;
    }

    get headers(): APIGatewayProxyEventHeaders {
        return this._headers;
    }

    get queryStringParameters(): APIGatewayProxyEventQueryStringParameters | null {
        return this._queryStringParameters;
    }
}
