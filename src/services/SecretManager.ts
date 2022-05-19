import { SecretsManager } from "aws-sdk";
import log4js from "log4js";

export default class SecretManager {
  readonly logger = log4js.getLogger("SecretManager");

  readonly region = "us-east-1";

  private secretsManager: SecretsManager;

  constructor() {
    this.secretsManager = new SecretsManager({
      region: process.env.AWS_REGION || this.region,
    });
  }

  getSecret = async (secretArn: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      this.secretsManager.getSecretValue(
        { SecretId: secretArn },
        (err, data) => {
          if (err) {
            this.logger.error(err);
            reject(err);
            return;
          }

          let res;
          if ("SecretString" in data) {
            res = data.SecretString as string;
          } else {
            res = Buffer.from(data.SecretBinary as any, "base64").toString(
              "ascii"
            );
          }

          try {
            resolve(JSON.parse(res));
          } catch (e) {
            this.logger.error(e);
            reject(e);
            return;
          }
        }
      );
    });
  };
}
