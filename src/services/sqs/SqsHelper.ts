import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';

export class SqsHelper {
  private runner: SQSClient;

  constructor() {
    this.runner = new SQSClient({
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

    try {
      const command = new SendMessageCommand(params);
      const data = await this.runner.send(command);
      console.log('Sqs send message successfully', data);
      return data;
    } catch (err) {
      console.error('Sqs send message error...', err);
      throw err;
    }
  }

  async sendFifo(arn: string, input: any, groupId: string): Promise<any> {
    const params = {
      MessageAttributes: {},
      MessageGroupId: groupId,
      MessageBody: JSON.stringify(input),
      QueueUrl: arn,
    };

    try {
      const command = new SendMessageCommand(params);
      const data = await this.runner.send(command);
      console.log('Sqs send message successfully', data);
      return data;
    } catch (err) {
      console.error('Sqs send message error...', err);
      throw err;
    }
  }
}
