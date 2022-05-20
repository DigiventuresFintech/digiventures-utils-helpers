import { SecretsManager } from "aws-sdk";
import log4js from "log4js";
export default class SecretManager {
    constructor() {
        this.logger = log4js.getLogger("SecretManager");
        this.region = "us-east-1";
        this.getSecret = async (secretArn) => {
            return new Promise((resolve, reject) => {
                this.secretsManager.getSecretValue({ SecretId: secretArn }, (err, data) => {
                    if (err) {
                        this.logger.error(err);
                        reject(err);
                        return;
                    }
                    let res;
                    if ("SecretString" in data) {
                        res = data.SecretString;
                    }
                    else {
                        res = Buffer.from(data.SecretBinary, "base64").toString("ascii");
                    }
                    try {
                        resolve(JSON.parse(res));
                    }
                    catch (e) {
                        this.logger.error(e);
                        reject(e);
                        return;
                    }
                });
            });
        };
        this.secretsManager = new SecretsManager({
            region: process.env.AWS_REGION || this.region,
        });
    }
}
