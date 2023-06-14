export interface IBaseMongoDBConnection {
    connect(): Promise<void>;
    close(): Promise<void>;
}
