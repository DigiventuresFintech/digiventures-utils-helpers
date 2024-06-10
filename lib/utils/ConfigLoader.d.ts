interface MODEL_STRING_ALIAS_STRING {
    [key: string]: string;
}
export declare class ConfigLoader {
    readonly references: MODEL_STRING_ALIAS_STRING;
    readonly secrets: string;
    readonly env: string | undefined;
    /**
     * SecretsLoader loads a list of secret manager by comma separated config,
     * filtering by env
     */
    secretsLoader(): Promise<void>;
    /**
     * Method that loads jwt information for authenticate request
     */
    loadJwtAuthData(): Promise<any>;
    mongodbCredentialsLoader(): Promise<any>;
    bigQueryCredentialsLoader(): Promise<any>;
}
export {};
