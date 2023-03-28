export declare class SqsHelper {
    private runner;
    constructor();
    send(arn: string, input: any): Promise<any>;
    sendFifo(arn: string, input: any, groupId: string): Promise<any>;
}
