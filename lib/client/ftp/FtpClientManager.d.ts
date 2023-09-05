/// <reference types="node" />
import { IFtpClientManager } from "./IFtpClientManager";
import SFTPClient from "ssh2-sftp-client";
export declare class FtpClientManager implements IFtpClientManager {
    readonly sftp: SFTPClient;
    private options;
    constructor(options: any);
    connect(): Promise<any>;
    put(origin: Buffer | string, dest: string, createDir?: boolean): Promise<string>;
    createSftpDirs(path: string): Promise<void>;
    close(): Promise<void>;
}
