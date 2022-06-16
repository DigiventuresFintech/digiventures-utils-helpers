export default class SecretManager {
    readonly region = "us-east-1";
    private secretsManager;
    constructor();
    getSecret: (secretArn: string) => Promise<any>;
}
