import SecretManager from "./services/SecretManager";
import log4js from "log4js";

export default class ConfigLoader {
  readonly logger = log4js.getLogger("ConfigLoader");

  readonly references = { production: "prod", develop: "dev" };

  readonly secrets = process.env.API_CONFIGURATION_SECRETS || "";

  readonly env = process.env.ENVIRONMENT;

  /**
   * SecretsLoader loads a list of secret manager by comma separated config, filtering by env
   */
  public async secretsLoader() {
    const ref = this.env ? this.references[this.env] : undefined;

    const secretManager: SecretManager = new SecretManager();
    if (ref) {
      this.logger.trace("loading secrets for environment", ref);

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
          this.logger.error("error loading secret configuration", err);
        });
    }
  }
}
