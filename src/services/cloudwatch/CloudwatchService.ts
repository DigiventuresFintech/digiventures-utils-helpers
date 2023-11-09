import {
    CloudWatchLogsClient,
    CreateLogStreamCommand,
    PutLogEventsCommand,
} from '@aws-sdk/client-cloudwatch-logs';
import { PutLogEventsCommandInput } from '@aws-sdk/client-cloudwatch-logs/dist-types/commands/PutLogEventsCommand';
import {
    CloudWatchClient,
    PutMetricDataCommand,
} from '@aws-sdk/client-cloudwatch';

export class CloudwatchService {
    private client: CloudWatchLogsClient;
    private metricsClient: CloudWatchClient;

    private readonly region = 'us-east-1';

    constructor() {
        this.client = new CloudWatchLogsClient({
            region: process.env.AWS_REGION || this.region,
        });
        this.metricsClient = new CloudWatchClient({
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

    public async putFlowsMetric(
        value: number,
        metricName: string,
        flowName: string,
        unit?: string,
    ): Promise<any> {
        const params: any = {
            MetricData: [
                {
                    MetricName: metricName,
                    Dimensions: [
                        {
                            Name: 'Flows',
                            Value: flowName,
                        },
                    ],
                    Timestamp: new Date(),
                    Unit: unit || 'Milliseconds',
                    Value: value,
                },
            ],
            Namespace: 'FlowsMetrics',
        };

        const command = new PutMetricDataCommand(params);
        try {
            return await this.metricsClient.send(command);
        } catch (error) {
            throw error;
        }
    }
}
