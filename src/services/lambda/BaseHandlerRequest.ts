import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export abstract class BaseHandlerRequest<I, O> {

    public async handlerRequest(input: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
        if (!input.body) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: `Body not defined`,
                }),
            };
        }

        let bodyInput: I = JSON.parse(input.body);
        let handlerResult: O
        try {
            handlerResult = await this.Handler(bodyInput)
        } catch (e) {
            console.error(`Base Handler error `, e);
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: e,
                }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(handlerResult),
        };
    }

    public abstract Handler(input: I): Promise<O>
}