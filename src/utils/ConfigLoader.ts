import { SecretManager } from '../services/secret/SecretManager';

interface MODEL_STRING_ALIAS_STRING {
    [key: string]: string;
}

export class ConfigLoader {
    readonly references = {
        production: 'prod',
        develop: 'dev',
    } as MODEL_STRING_ALIAS_STRING;

    readonly secrets = process.env.API_CONFIGURATION_SECRETS || '';
    readonly env = process.env.ENVIRONMENT;

    /**
     * SecretsLoader loads a list of secret manager by comma separated config,
     * filtering by env
     */
    public async secretsLoader() {
        const ref = this.env ? this.references[this.env] : undefined;

        const secretManager: SecretManager = new SecretManager();
        if (ref) {
            console.trace('loading secrets for environment', ref);

            const pending = this.secrets
                .split(',')
                .filter(v => v.includes(ref))
                .map(v => (v.endsWith(',') ? v.substring(0, v.length - 1) : v))
                .map(v => secretManager.getSecret(`${v}`));

            await Promise.all(pending)
                .then(res => {
                    process.env = { ...process.env, ...(res as any) };
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
        if (!AUTHENTICATION_ARN) throw new Error(`secret not defined`);

        const secretManager = new SecretManager();
        try {
            const output: any = await secretManager.getSecret(
                AUTHENTICATION_ARN,
            );
            process.env.JWT_SECRET_TOKEN = output?.secret_token;
            process.env.JWT_OLD_SECRET_TOKEN = output?.old_secret_token;
            return output;
        } catch (e) {
            console.error(`Error loading jwt secret configuration`, e);
            throw e;
        }
    }

    async mongodbCredentialsLoader(): Promise<any> {
        const MONGODB_CREDENTIALS_ARN = process.env.MONGODB_CREDENTIALS_ARN;
        if (!MONGODB_CREDENTIALS_ARN)
            throw new Error(`mongodb credentials not defined`);

        const secretManager = new SecretManager();
        try {
            const output: any = await secretManager.getSecret(
                MONGODB_CREDENTIALS_ARN,
            );
            console.trace('mongodb secret configuration loaded successfully');

            process.env.MONGODB_CREDENTIALS = output
            return output;
        } catch (e) {
            console.error(`Error loading mongodb secret configuration`, e);
            throw e;
        }
    }
}
