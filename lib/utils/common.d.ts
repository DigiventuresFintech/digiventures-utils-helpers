export declare function getEnv(): string;
export declare function aesDecrypt(key: string, iv: string, base64String: string, encryptionType?: string): string;
export declare function aesEncrypt(key: string, iv: string, base64String: string, encryptionType?: string): string;
export declare function exponentialRetryOperation<T>(operation: () => Promise<T>, options?: any): Promise<T>;
export declare function checkRequired(obj: any, args: string[], cb?: (e: any) => void): boolean | void;
