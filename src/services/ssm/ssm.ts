import { SendCommandCommand, SSMClient } from '@aws-sdk/client-ssm';

export class Ssm {
  private readonly client: SSMClient;
  private readonly region = 'us-east-1';

  constructor() {
    this.client = new SSMClient({
      region: process.env.AWS_REGION || this.region,
    });
  }

  async sendSSMCommand(instanceIds: string[], commands: string[]) {
    const params = {
      DocumentName: 'AWS-RunShellScript',
      InstanceIds: instanceIds,
      Parameters: {
        commands: commands,
      },
    };

    try {
      const sendCommand = new SendCommandCommand(params);
      return await this.client.send(sendCommand);
    } catch (err) {
      console.error('Error al enviar el comando:', err);
      throw err;
    }
  }
}

const instance = new Ssm();

export async function sendSSMCommand(
  instanceIds: string[],
  commands: string[],
) {
  return instance.sendSSMCommand(instanceIds, commands);
}

export const broadcastInstancesCommand = (path: string, data: string) => {
  return `
    TOKEN=$(curl -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")
    curl -X POST -H "Content-Type: application/json" -d '${data}' http://$(curl -s -H "X-aws-ec2-metadata-token: $TOKEN" http://169.254.169.254/latest/meta-data/local-ipv4)/${path}
    `;
};
