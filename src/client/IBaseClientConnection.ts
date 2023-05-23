export interface IBaseClientConnection {
    connect(): Promise<any>;
    close(): Promise<void>;
}
