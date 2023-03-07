import { IRequestHandler } from './IRequestHandler';
import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
    SQSEvent,
    SQSRecord,
} from 'aws-lambda';
import { RequestInfo } from './RequestInfo';

export abstract class SQSBaseHandler<I>
    implements IRequestHandler<SQSEvent, void>
{
    /**
     * Entry point used by SQS lambda trigger
     * @param event SQS Event
     */
    public requestHandler = async (event: SQSEvent): Promise<void> => {
        console.log('input received', event);

        for (const record of event.Records) {
            console.log('record received', record.body);

            const body: I = JSON.parse(record.body || '');
            const request: RequestInfo<I> = new RequestInfo(body);
            try {
                await this.handler(request);
            } catch (error: any) {
                console.error('sqs execution error', error, record);
                throw new Error(error);
            }
        }
    };

    /**
     * Base handler function
     * @param input value that be used as input
     */
    abstract handler(input: RequestInfo<I>): Promise<void>;
}
