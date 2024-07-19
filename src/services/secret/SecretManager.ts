import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';

export class SecretManager {
  readonly region = 'us-east-1';
  private secretsManager: SecretsManagerClient;

  constructor() {
    this.secretsManager = new SecretsManagerClient({
      region: process.env.AWS_REGION || this.region,
    });
  }

  async getSecret(secretArn: string): Promise<any> {
    try {
      const command = new GetSecretValueCommand({ SecretId: secretArn });
      const data = await this.secretsManager.send(command);

      let secretValue: string;
      if ('SecretString' in data) {
        secretValue = data.SecretString as string;
      } else {
        secretValue = Buffer.from(data.SecretBinary as any, 'base64').toString(
          'ascii',
        );
      }

      try {
        return JSON.parse(secretValue);
      } catch (e) {
        console.error('Error parsing secret value:', e);
        throw e;
      }
    } catch (err) {
      console.error('Error retrieving secret:', err);
      throw err;
    }
  }
}
