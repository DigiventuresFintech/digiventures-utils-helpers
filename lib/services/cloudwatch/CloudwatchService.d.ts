import { PutLogEventsCommandInput } from '@aws-sdk/client-cloudwatch-logs/dist-types/commands/PutLogEventsCommand';
export declare class CloudwatchService {
    private client;
    private readonly region;
    constructor();
    putLog(input: PutLogEventsCommandInput): Promise<any>;
}
