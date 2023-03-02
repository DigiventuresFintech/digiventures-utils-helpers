import { IRequestHandler } from './IRequestHandler';
import { SQSEvent } from 'aws-lambda';
import { RequestInfo } from './RequestInfo';
export declare abstract class SQSBaseHandler<I, O> implements IRequestHandler<SQSEvent, void> {
    /**
     * Entry point used by SQS lambda trigger
     * @param event SQS Event
     */
    requestHandler: (event: SQSEvent) => Promise<void>;
    /**
     * Base handler function
     * @param input value that be used as input
     */
    abstract handler(input: RequestInfo<I>): Promise<O>;
}
