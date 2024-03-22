/// <reference types="node" />
import { IFtpClientManager } from './IFtpClientManager';
import { Readable } from 'stream';
export declare class FtpClientManager implements IFtpClientManager {
    private readonly client;
    private options;
    private workingDirectory;
    constructor(options: any);
    connect(): Promise<any>;
    put(origin: Readable | string, dest: string, createDir?: boolean): Promise<any>;
    createSftpDirs(path: string): Promise<string>;
    close(): Promise<void>;
}
