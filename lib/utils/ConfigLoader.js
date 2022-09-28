"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigLoader = void 0;
const SecretManager_1 = require("../services/secret/SecretManager");
class ConfigLoader {
    constructor() {
        this.references = {
            production: 'prod',
            develop: 'dev',
        };
        this.secrets = process.env.API_CONFIGURATION_SECRETS || '';
        this.env = process.env.ENVIRONMENT;
    }
    /**
     * SecretsLoader loads a list of secret manager by comma separated config,
     * filtering by env
     */
    async secretsLoader() {
        const ref = this.env ? this.references[this.env] : undefined;
        const secretManager = new SecretManager_1.SecretManager();
        if (ref) {
            console.trace('loading secrets for environment', ref);
            const pending = this.secrets
                .split(',')
                .filter(v => v.includes(ref))
                .map(v => (v.endsWith(',') ? v.substring(0, v.length - 1) : v))
                .map(v => secretManager.getSecret(`${v}`));
            await Promise.all(pending)
                .then(res => {
                process.env = { ...process.env, ...res };
            })
                .catch(err => {
                console.error('error loading secret configuration', err);
            });
        }
    }
    /**
     * Method that loads jwt information for authenticate request
     */
    async loadJwtAuthData() {
        const AUTHENTICATION_ARN = process.env.AUTHENTICATION_ARN;
        if (!AUTHENTICATION_ARN)
            throw new Error(`secret not defined`);
        const secretManager = new SecretManager_1.SecretManager();
        try {
            const { secret_token: token } = await secretManager.getSecret(AUTHENTICATION_ARN);
            process.env.JWT_SECRET_TOKEN = token;
        }
        catch (e) {
            console.error(`Error loading jwt secret configuration`, e);
            throw e;
        }
        console.trace("secret configuration loaded successfully");
    }
}
exports.ConfigLoader = ConfigLoader;
