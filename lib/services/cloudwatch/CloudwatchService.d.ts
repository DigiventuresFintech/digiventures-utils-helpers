export declare class CloudwatchService {
    private client;
    private readonly region;
    constructor();
    putLog(logEventMessage: string, logGroupName: string, logStreamName: string): Promise<any>;
}
