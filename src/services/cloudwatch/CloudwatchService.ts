import {
    CloudWatchLogsClient,
    CreateLogStreamCommand,
    PutLogEventsCommand,
} from '@aws-sdk/client-cloudwatch-logs';
import { PutLogEventsCommandInput } from '@aws-sdk/client-cloudwatch-logs/dist-types/commands/PutLogEventsCommand';

export class CloudwatchService {
    private client: CloudWatchLogsClient;
    private readonly region = 'us-east-1';

    constructor() {
        this.client = new CloudWatchLogsClient({
            region: process.env.AWS_REGION || this.region,
        });
    }

    public async putLog(input: PutLogEventsCommandInput): Promise<any> {
        try {
            await this.client.send(
                new CreateLogStreamCommand({
                    logGroupName: input.logGroupName,
                    logStreamName: input.logStreamName,
                }),
            );
        } catch (error) {}

        const command = new PutLogEventsCommand(input);
        try {
            return await this.client.send(command);
        } catch (error) {
            throw error;
        }
    }
}
