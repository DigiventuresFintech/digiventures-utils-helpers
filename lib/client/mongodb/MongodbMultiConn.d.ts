import { IBaseClientConnection } from "../IBaseClientConnection";
export declare class MongodbMultiConn implements IBaseClientConnection {
    private readonly _connections;
    constructor();
    close(): Promise<any>;
    connect(connections?: any): Promise<any>;
    get connections(): Record<string, any>;
}
export declare const instance: MongodbMultiConn;
export declare function connect(connections?: any): Promise<any>;
export declare function close(): Promise<any>;
export declare function getConnection(key: string): any;
