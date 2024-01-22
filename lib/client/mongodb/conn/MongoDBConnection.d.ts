import { IBaseClientConnection } from '../../IBaseClientConnection';
export declare class MongoDBConnection implements IBaseClientConnection {
    /**
     * Mongodb connection instance
     */
    private conn;
    /**
     * Current workspace, by default is "default"
     */
    private readonly workspace;
    /**
     * Mongodb config options
     */
    private readonly options?;
    /**
     * Secret manager where credentials are stored
     */
    private readonly credentialsArn;
    /**
     * Default credentials arn
     */
    private readonly DEFAULT_MONGODB_CREDENTIALS_ARN;
    constructor(options?: any);
    connect(): Promise<any>;
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
