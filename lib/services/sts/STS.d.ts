import AWS from 'aws-sdk';
export declare class STS {
    readonly stsInstance: AWS.STS;
    constructor();
    assumeRole(roleArn: string, sessionName?: string): Promise<any>;
}
