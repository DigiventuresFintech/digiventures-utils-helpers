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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SecretManager_1 = __importDefault(require("./services/SecretManager"));
const log4js_1 = __importDefault(require("log4js"));
class ConfigLoader {
    constructor() {
        this.logger = log4js_1.default.getLogger("ConfigLoader");
        this.references = { production: "prod", develop: "dev" };
        this.secrets = process.env.API_CONFIGURATION_SECRETS || "";
        this.env = process.env.ENVIRONMENT;
    }
    /**
     * SecretsLoader loads a list of secret manager by comma separated config, filtering by env
     */
    secretsLoader() {
        return __awaiter(this, void 0, void 0, function* () {
            const ref = this.env ? this.references[this.env] : undefined;
            const secretManager = new SecretManager_1.default();
            if (ref) {
                this.logger.trace("loading secrets for environment", ref);
                const pending = this.secrets
                    .split(",")
                    .filter((v) => v.includes(ref))
                    .map((v) => (v.endsWith(",") ? v.substring(0, v.length - 1) : v))
                    .map((v) => secretManager.getSecret(`${v}`));
                yield Promise.all(pending)
                    .then((res) => {
                    process.env = Object.assign(Object.assign({}, process.env), res);
                })
                    .catch((err) => {
                    this.logger.error("error loading secret configuration", err);
                });
            }
        });
    }
}
exports.default = ConfigLoader;
