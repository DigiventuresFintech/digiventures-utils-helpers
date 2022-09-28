import crypto from 'crypto';

const UTF8Encoding = 'utf8';
const Base64Encoding = 'base64';
type Encryption = 'aes-256-cbc' | 'des-ede3';

export class AesEncryption {
    private readonly AesKey: string;
    private readonly AesIV: string;
    private readonly EncryptionType: Encryption;

    constructor(aesKey: string, aesIv: string, type: Encryption) {
        this.AesKey = aesKey;
        this.AesIV = aesIv;
        this.EncryptionType = type;
    }

    public encrypt(value: any) {
        if (!value) return value;

        try {
            const cipher = crypto.createCipheriv(
                this.EncryptionType,
                this.AesKey,
                this.AesIV,
            );
            let encrypted = cipher.update(value, UTF8Encoding, Base64Encoding);
            encrypted += cipher.final(Base64Encoding);
            return encrypted;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    public decrypt(value: any): any {
        if (!value) return value;

        try {
            const decipher = crypto.createDecipheriv(
                this.EncryptionType,
                this.AesKey,
                this.AesIV,
            );
            const decrypted = decipher.update(
                value,
                Base64Encoding,
                UTF8Encoding,
            );
            return decrypted + decipher.final(UTF8Encoding);
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}
