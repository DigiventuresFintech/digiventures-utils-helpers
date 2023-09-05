/// <reference types="node" />
export interface IFtpClientManager {
    connect(): Promise<any>;
    close(): Promise<void>;
    put(origin: Buffer | string, dest: string, createDir?: boolean): Promise<string>;
    createSftpDirs(path: string): Promise<void>;
}
