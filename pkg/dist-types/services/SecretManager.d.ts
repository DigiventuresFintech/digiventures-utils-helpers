import log4js from "log4js";
export default class SecretManager {
    readonly logger: log4js.Logger;
    readonly region = "us-east-1";
    private secretsManager;
    constructor();
    getSecret: (secretArn: string) => Promise<any>;
}
