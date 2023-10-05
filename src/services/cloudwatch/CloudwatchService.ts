import { CloudWatchLogsClient, PutLogEventsCommand } from "@aws-sdk/client-cloudwatch-logs";

export class CloudwatchService {
  private client: CloudWatchLogsClient;
  private readonly region = 'us-east-1';

  constructor() {
    this.client = new CloudWatchLogsClient({
      region: process.env.AWS_REGION || this.region,
    })
  }

  public async putLog(logEventMessage: string, logGroupName: string, logStreamName: string): Promise<any> {
    const params = {
      logGroupName: logGroupName,
      logStreamName: logStreamName,
      logEvents: [
        {
          message: logEventMessage,
          timestamp: new Date().getTime(),
        },
      ],
    };

    const command = new PutLogEventsCommand(params);
    try {
      return await this.client.send(command)
    } catch (error) {
      throw error
    }
  }
}
