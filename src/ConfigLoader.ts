import SecretManager from "./services/SecretManager";

interface MODEL_STRING_ALIAS_STRING {
  [key: string]: string;
}

export default class ConfigLoader {
  readonly references = {
    production: "prod",
    develop: "dev"
  } as MODEL_STRING_ALIAS_STRING;

  readonly secrets = process.env.API_CONFIGURATION_SECRETS || "";

  readonly env = process.env.ENVIRONMENT;

  /**
   * SecretsLoader loads a list of secret manager by comma separated config, filtering by env
   */
  public async secretsLoader() {
    const ref = this.env ? this.references[this.env] : undefined;

    const secretManager: SecretManager = new SecretManager();
    if (ref) {
      console.trace("loading secrets for environment", ref);

      const pending = this.secrets
        .split(",")
        .filter((v) => v.includes(ref))
        .map((v) => (v.endsWith(",") ? v.substring(0, v.length - 1) : v))
        .map((v) => secretManager.getSecret(`${v}`));

      await Promise.all(pending)
        .then((res) => {
          process.env = { ...process.env, ...(res as any) };
        })
        .catch((err) => {
          console.error("error loading secret configuration", err);
        });
    }
  }

  async load() {
    const AUTHENTICATION_ARN = process.env.AUTHENTICATION_ARN;
    if (!AUTHENTICATION_ARN) {
      throw new Error(`secret not defined`)
    }
    const secretManager = new SecretManager();
    try {
      process.env.AUTHENTICATION_DATA = await secretManager.getSecret(AUTHENTICATION_ARN)
    } catch (e) {
      console.error(`error loading credentials`, e);
      throw e
    }
  }
}
