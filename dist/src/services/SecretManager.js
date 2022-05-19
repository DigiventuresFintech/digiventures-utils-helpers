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
const aws_sdk_1 = require("aws-sdk");
const log4js_1 = __importDefault(require("log4js"));
class SecretManager {
    constructor() {
        this.logger = log4js_1.default.getLogger("SecretManager");
        this.region = "us-east-1";
        this.getSecret = (secretArn) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.secretsManager.getSecretValue({ SecretId: secretArn }, (err, data) => {
                    if (err) {
                        this.logger.error(err);
                        reject(err);
                        return;
                    }
                    let res;
                    if ("SecretString" in data) {
                        res = data.SecretString;
                    }
                    else {
                        res = Buffer.from(data.SecretBinary, "base64").toString("ascii");
                    }
                    try {
                        resolve(JSON.parse(res));
                    }
                    catch (e) {
                        this.logger.error(e);
                        reject(e);
                        return;
                    }
                });
            });
        });
        this.secretsManager = new aws_sdk_1.SecretsManager({
            region: process.env.AWS_REGION || this.region,
        });
    }
}
exports.default = SecretManager;
