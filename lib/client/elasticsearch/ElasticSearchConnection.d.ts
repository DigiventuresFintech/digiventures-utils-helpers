import { IBaseClientConnection } from '../IBaseClientConnection';
export declare class ElasticSearchConnection implements IBaseClientConnection {
    /**
     * ElasticSearch client instance
     */
    private client;
    /**
     * Current workspace, by default is "default"
     */
    private readonly workspace;
    /**
     * Secret manager where credentials are stored
     */
    private readonly credentialsArn;
    private readonly auth?;
    /**
     * Default credentials arn
     */
    private readonly DEFAULT_ELASTICSEARCH_CREDENTIALS_ARN;
    constructor(options?: any);
    connect(): Promise<any>;
    close(): Promise<void>;
    warmup: () => void;
    /**
     * Retrieves credentials asynchronously.
     *
     * @return A Promise representing the credentials.
     * @throws Exception If an error occurs while retrieving the credentials.
     */
    private getCredentials;
}
