"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecretManager = void 0;
const aws_sdk_1 = require("aws-sdk");
class SecretManager {
    constructor() {
        this.region = 'us-east-1';
        this.getSecret = async (secretArn) => {
            return new Promise((resolve, reject) => {
                this.secretsManager.getSecretValue({ SecretId: secretArn }, (err, data) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                        return;
                    }
                    let res;
                    if ('SecretString' in data) {
                        res = data.SecretString;
                    }
                    else {
                        res = Buffer.from(data.SecretBinary, 'base64').toString('ascii');
                    }
                    try {
                        resolve(JSON.parse(res));
                    }
                    catch (e) {
                        console.error(e);
                        reject(e);
                        return;
                    }
                });
            });
        };
        this.secretsManager = new aws_sdk_1.SecretsManager({
            region: process.env.AWS_REGION || this.region,
        });
    }
}
exports.SecretManager = SecretManager;
