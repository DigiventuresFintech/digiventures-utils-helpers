import { SQS } from 'aws-sdk';

export class SqsHelper {
    private runner: SQS;

    constructor() {
        this.runner = new SQS({
            apiVersion: '2012-11-05',
            region: 'us-east-1',
        });
    }

    async send(arn: string, input: any): Promise<any> {
        const params = {
            MessageAttributes: {},
            MessageBody: JSON.stringify(input),
            QueueUrl: arn,
        };

        return new Promise(async (resolve, reject) => {
            this.runner.sendMessage(params, (err, data) => {
                if (err) {
                    console.error('Sqs send message error...', err);
                    reject(err);
                }
                console.log('Sqs send message successfully', data);
                resolve(data);
            });
        });
    }

    async sendFifo(arn: string, input: any, groupId: string): Promise<any> {
        const params = {
            MessageAttributes: {},
            MessageGroupId: groupId,
            MessageBody: JSON.stringify(input),
            QueueUrl: arn,
        };

        return new Promise(async (resolve, reject) => {
            this.runner.sendMessage(params, (err, data) => {
                if (err) {
                    console.error('Sqs send message error...', err);
                    reject(err);
                }
                console.log('Sqs send message successfully', data);
                resolve(data);
            });
        });
    }
}
