declare type Encryption = "aes-256-cbc" | "des-ede3";
export declare class AesEncryption {
    private readonly AesKey;
    private readonly AesIV;
    private readonly EncryptionType;
    constructor(aesKey: string, aesIv: string, type: Encryption);
    encrypt(value: any): any;
    decrypt(value: any): any;
}
export {};
