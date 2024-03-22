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
exports.exponentialRetryOperation = exports.aesEncrypt = exports.aesDecrypt = exports.getEnv = void 0;
const crypto_1 = __importDefault(require("crypto"));
function getEnv() {
    const env = process.env.ENVIRONMENT || 'DEV';
    return env.toUpperCase();
}
exports.getEnv = getEnv;
function aesDecrypt(key, iv, base64String, encryptionType = 'aes-256-cbc') {
    if (base64String === null ||
        typeof base64String === 'undefined' ||
        base64String === '')
        return base64String;
    try {
        const decipher = crypto_1.default.createDecipheriv(encryptionType, key, iv);
        const decrypted = decipher.update(base64String, 'base64', 'utf-8');
        return decrypted + decipher.final('utf-8');
    }
    catch (e) {
        console.error('error on hash decryption', base64String, e);
    }
    return base64String;
}
exports.aesDecrypt = aesDecrypt;
function aesEncrypt(key, iv, base64String, encryptionType = 'aes-256-cbc') {
    if (base64String === null ||
        typeof base64String === 'undefined' ||
        base64String === '')
        return base64String;
    try {
        const cipher = crypto_1.default.createCipheriv(encryptionType, key, iv);
        let encrypted = cipher.update(base64String, 'utf-8', 'base64');
        encrypted += cipher.final('base64');
        return encrypted;
    }
    catch (e) {
        console.error('error on hash encryption', base64String, e);
    }
    return base64String;
}
exports.aesEncrypt = aesEncrypt;
function exponentialRetryOperation(operation, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const { maxRetries = 3, retryDelay = 5000 } = options;
        let retries = 0;
        while (retries < maxRetries) {
            try {
                return yield operation();
            }
            catch (e) {
                console.error(`error connecting client, retrying..`, e);
                retries++;
                if (retries < maxRetries) {
                    /* exponential backoff retry method
                     * https://en.wikipedia.org/wiki/Exponential_backoff */
                    const currentRetryDelay = retries ? 0 : retryDelay !== null && retryDelay !== void 0 ? retryDelay : 100;
                    const delay = currentRetryDelay + ((Math.pow(2, retries) - 1) / 2) * 1000;
                    console.log(`Waiting ${delay / 1000} seconds before retrying...`);
                    yield new Promise(resolve => {
                        setTimeout(resolve, delay);
                    });
                }
            }
        }
        throw new Error('client max retries reached...');
    });
}
exports.exponentialRetryOperation = exponentialRetryOperation;
//# sourceMappingURL=common.js.map