import { RequestInfo } from './RequestInfo';
import {
    APIGatewayProxyEventHeaders,
    APIGatewayProxyEventQueryStringParameters,
} from 'aws-lambda/trigger/api-gateway-proxy';
export declare class ApiGatewayRequestInfo<B> extends RequestInfo<B> {
    private readonly _headers;
    private readonly _queryStringParameters;
    constructor(
        body: B,
        headers: APIGatewayProxyEventHeaders,
        queryStringParameters: APIGatewayProxyEventQueryStringParameters | null,
    );
    get headers(): APIGatewayProxyEventHeaders;
    get queryStringParameters(): APIGatewayProxyEventQueryStringParameters | null;
}
