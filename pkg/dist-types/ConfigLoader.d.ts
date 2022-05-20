import log4js from "log4js";
interface MODEL_STRING_ALIAS_STRING {
    [key: string]: string;
}
export default class ConfigLoader {
    readonly logger: log4js.Logger;
    readonly references: MODEL_STRING_ALIAS_STRING;
    readonly secrets: string;
    readonly env: string | undefined;
    /**
     * SecretsLoader loads a list of secret manager by comma separated config, filtering by env
     */
    secretsLoader(): Promise<void>;
}
export {};
