import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
export declare abstract class BaseHandlerRequest<I, O> {
    handlerRequest(input: APIGatewayProxyEvent): Promise<APIGatewayProxyResult>;
    abstract Handler(input: I): Promise<O>;
}
