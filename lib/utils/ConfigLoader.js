"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    secretsLoader() {
        return __awaiter(this, void 0, void 0, function* () {
            const ref = this.env ? this.references[this.env] : undefined;
            const secretManager = new SecretManager_1.SecretManager();
            if (ref) {
                console.trace('loading secrets for environment', ref);
                const pending = this.secrets
                    .split(',')
                    .filter(v => v.includes(ref))
                    .map(v => (v.endsWith(',') ? v.substring(0, v.length - 1) : v))
                    .map(v => secretManager.getSecret(`${v}`));
                yield Promise.all(pending)
                    .then(res => {
                    process.env = Object.assign(Object.assign({}, process.env), res);
                })
                    .catch(err => {
                    console.error('error loading secret configuration', err);
                });
            }
        });
    }
    /**
     * Method that loads jwt information for authenticate request
     */
    loadJwtAuthData() {
        return __awaiter(this, void 0, void 0, function* () {
            const AUTHENTICATION_ARN = process.env.AUTHENTICATION_ARN;
            if (!AUTHENTICATION_ARN)
                throw new Error(`secret not defined`);
            const secretManager = new SecretManager_1.SecretManager();
            try {
                const output = yield secretManager.getSecret(AUTHENTICATION_ARN);
                process.env.JWT_SECRET_TOKEN = output === null || output === void 0 ? void 0 : output.secret_token;
                process.env.JWT_OLD_SECRET_TOKEN = output === null || output === void 0 ? void 0 : output.old_secret_token;
                return output;
            }
            catch (e) {
                console.error(`Error loading jwt secret configuration`, e);
                throw e;
            }
        });
    }
}
exports.ConfigLoader = ConfigLoader;
