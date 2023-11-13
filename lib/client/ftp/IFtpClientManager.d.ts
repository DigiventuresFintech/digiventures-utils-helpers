/// <reference types="node" />
import { Readable } from 'stream';
export interface IFtpClientManager {
    connect(): Promise<any>;
    close(): Promise<void>;
    put(origin: Readable | string, dest: string, createDir?: boolean): Promise<any>;
    createSftpDirs(path: string): Promise<string>;
}
