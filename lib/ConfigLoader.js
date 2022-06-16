"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SecretManager_1 = __importDefault(require("./services/SecretManager"));
class ConfigLoader {
    constructor() {
        this.references = {
            production: "prod",
            develop: "dev"
        };
        this.secrets = process.env.API_CONFIGURATION_SECRETS || "";
        this.env = process.env.ENVIRONMENT;
    }
    /**
     * SecretsLoader loads a list of secret manager by comma separated config, filtering by env
     */
    async secretsLoader() {
        const ref = this.env ? this.references[this.env] : undefined;
        const secretManager = new SecretManager_1.default();
        if (ref) {
            console.trace("loading secrets for environment", ref);
            const pending = this.secrets
                .split(",")
                .filter((v) => v.includes(ref))
                .map((v) => (v.endsWith(",") ? v.substring(0, v.length - 1) : v))
                .map((v) => secretManager.getSecret(`${v}`));
            await Promise.all(pending)
                .then((res) => {
                process.env = { ...process.env, ...res };
            })
                .catch((err) => {
                console.error("error loading secret configuration", err);
            });
        }
    }
}
exports.default = ConfigLoader;
