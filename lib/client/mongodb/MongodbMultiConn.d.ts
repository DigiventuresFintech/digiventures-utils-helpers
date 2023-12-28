import { IBaseClientConnection } from "../IBaseClientConnection";
export declare class MongodbMultiConn implements IBaseClientConnection {
    private readonly _connections;
    constructor();
    close(): Promise<any>;
    connect(connections?: any): Promise<any>;
    get connections(): Record<string, any>;
}
export declare const instance: MongodbMultiConn;
export declare function connect(): Promise<any>;
export declare function close(): Promise<any>;
