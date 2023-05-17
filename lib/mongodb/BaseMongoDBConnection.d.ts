import { IBaseMongoDBConnection } from './IBaseMongoDBConnection';
export declare class BaseMongoDBConnection implements IBaseMongoDBConnection {
    /**
     * Mongodb connection instance
     */
    private readonly conn;
    /**
     * Current workspace, by default is "default"
     */
    private readonly workspace;
    /**
     * Secret manager where credentials are stored
     */
    private readonly credentialsArn;
    /**
     * Default credentials arn
     */
    private readonly DEFAULT_MONGODB_CREDENTIALS_ARN;
    constructor(options?: any);
    connect(): Promise<void>;
    /**
     * Close existing mongoose client connection
     */
    close(): Promise<void>;
    /**
     * Retrieves credentials asynchronously.
     *
     * @return A Promise representing the credentials.
     * @throws Exception If an error occurs while retrieving the credentials.
     */
    private getCredentials;
}