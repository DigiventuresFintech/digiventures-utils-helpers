"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AesEncryption = void 0;
const crypto_1 = __importDefault(require("crypto"));
const UTF8Encoding = "utf8";
const Base64Encoding = "base64";
class AesEncryption {
    constructor(aesKey, aesIv, type) {
        this.AesKey = aesKey;
        this.AesIV = aesIv;
        this.EncryptionType = type;
    }
    encrypt(value) {
        if (!value)
            return value;
        try {
            const cipher = crypto_1.default.createCipheriv(this.EncryptionType, this.AesKey, this.AesIV);
            let encrypted = cipher.update(value, UTF8Encoding, Base64Encoding);
            encrypted += cipher.final(Base64Encoding);
            return encrypted;
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
    decrypt(value) {
        if (!value)
            return value;
        try {
            const decipher = crypto_1.default.createDecipheriv(this.EncryptionType, this.AesKey, this.AesIV);
            const decrypted = decipher.update(value, Base64Encoding, UTF8Encoding);
            return decrypted + decipher.final(UTF8Encoding);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
}
exports.AesEncryption = AesEncryption;
