import AWS from 'aws-sdk';

export class STS {
  readonly stsInstance: AWS.STS;

  constructor() {
    this.stsInstance = new AWS.STS({
      region: process.env.AWS_REGION || 'us-east-1',
    });
  }

  assumeRole(roleArn: string, sessionName?: string): Promise<any> {
    const params = {
      RoleArn: roleArn,
      RoleSessionName: sessionName || 'Digi-Sts-Role',
    };

    return new Promise((resolve, reject) => {
      this.stsInstance.assumeRole(params, (err, data) => {
        if (err) {
          console.error('Error assuming role:', roleArn, err);
          reject(err);
        } else {
          resolve(data.Credentials);
        }
      });
    });
  }
}
