"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aesEncrypt = exports.aesDecrypt = exports.getEnv = void 0;
const crypto_1 = __importDefault(require("crypto"));
function getEnv() {
    const env = process.env.ENVIRONMENT || 'DEV';
    return env.toUpperCase();
}
exports.getEnv = getEnv;
function aesDecrypt(key, iv, base64String, encryptionType = "aes-256-cbc") {
    if (base64String === null || typeof base64String === "undefined" || base64String === "")
        return base64String;
    try {
        const decipher = crypto_1.default.createDecipheriv(encryptionType, key, iv);
        const decrypted = decipher.update(base64String, 'base64', 'utf-8');
        return decrypted + decipher.final('utf-8');
    }
    catch (e) {
        console.error("error on hash decryption", base64String, e);
    }
    return base64String;
}
exports.aesDecrypt = aesDecrypt;
function aesEncrypt(key, iv, base64String, encryptionType = "aes-256-cbc") {
    if (base64String === null || typeof base64String === "undefined" || base64String === "")
        return base64String;
    try {
        const cipher = crypto_1.default.createCipheriv(encryptionType, key, iv);
        let encrypted = cipher.update(base64String, 'utf-8', 'base64');
        encrypted += cipher.final('base64');
        return encrypted;
    }
    catch (e) {
        console.error("error on hash encryption", base64String, e);
    }
    return base64String;
}
exports.aesEncrypt = aesEncrypt;
//# sourceMappingURL=common.js.map