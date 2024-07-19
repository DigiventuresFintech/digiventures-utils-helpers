import { STSClient, AssumeRoleCommand } from '@aws-sdk/client-sts';

export class STSService {
  private stsClient: STSClient;

  constructor() {
    this.stsClient = new STSClient({
      region: process.env.AWS_REGION || 'us-east-1',
    });
  }

  public async assumeRole(roleArn: string, sessionName?: string): Promise<any> {
    const params = {
      RoleArn: roleArn,
      RoleSessionName: sessionName || 'Digi-Sts-Role',
    };

    try {
      const command = new AssumeRoleCommand(params);
      const data = await this.stsClient.send(command);
      return data.Credentials;
    } catch (err) {
      console.error('Error assuming role:', roleArn, err);
      throw err;
    }
  }
}
