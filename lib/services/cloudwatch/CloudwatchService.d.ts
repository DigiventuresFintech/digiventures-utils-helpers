import { PutLogEventsCommandInput } from '@aws-sdk/client-cloudwatch-logs/dist-types/commands/PutLogEventsCommand';
export declare class CloudwatchService {
    private client;
    private metricsClient;
    private readonly region;
    constructor();
    putLog(input: PutLogEventsCommandInput): Promise<any>;
    putFlowsMetric(
        value: number,
        metricName: string,
        flowName: string,
        unit?: string,
    ): Promise<any>;
}
