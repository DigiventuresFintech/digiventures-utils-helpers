import { APIGatewayProxyEventHeaders, APIGatewayProxyEventQueryStringParameters } from 'aws-lambda/trigger/api-gateway-proxy';
import { RequestDataBody } from "./RequestDataBody";
export declare class RequestInfo<B extends RequestDataBody> {
    private readonly _body;
    private readonly _headers;
    private readonly _queryStringParameters;
    constructor(body: B, headers: APIGatewayProxyEventHeaders, queryStringParameters: APIGatewayProxyEventQueryStringParameters | null);
    get body(): B;
    get headers(): APIGatewayProxyEventHeaders;
    get queryStringParameters(): APIGatewayProxyEventQueryStringParameters | null;
}
