import { SecretManager } from '../../services/secret/SecretManager';
import { IBaseClientConnection } from '../IBaseClientConnection';
import * as mongoose from 'mongoose';

export class MongoDBConnection implements IBaseClientConnection {
    /**
     * Mongodb connection instance
     */
    private conn: mongoose.Mongoose | null;
    /**
     * Current workspace, by default is "default"
     */
    private readonly workspace: string;
    /**
     * Secret manager where credentials are stored
     */
    private readonly credentialsArn: string;
    /**
     * Default credentials arn
     */
    private readonly DEFAULT_MONGODB_CREDENTIALS_ARN =
        'arn:aws:secretsmanager:us-east-1:810659965432:secret:mongodb_credentials_dev-8eqHbp';

    constructor(options?: any) {
        this.conn = null;
        this.workspace = options?.workspace || 'default';
        this.credentialsArn =
            options?.credentialsArn ||
            process.env.MONGODB_CREDENTIALS_ARN ||
            this.DEFAULT_MONGODB_CREDENTIALS_ARN;
    }

    async connect(): Promise<any> {
        if (!this.conn) {
            const { mongodb } = await this.getCredentials();

            const uri: string | undefined = mongodb?.connection?.string;
            if (!uri) {
                throw new Error('mongodb uri not defined');
            }

            try {
                this.conn = await mongoose.connect(uri);
                console.log('mongodb successfully connected');
            } catch (e) {
                console.error('error mongodb connection', e);
                throw e;
            }
        }
        return this.conn;
    }

    /**
     * Close existing mongoose client connection
     */
    async close(): Promise<void> {
        if (this.conn) {
            await this.conn.connection.close();
        }
    }

    /**
     * Retrieves credentials asynchronously.
     *
     * @return A Promise representing the credentials.
     * @throws Exception If an error occurs while retrieving the credentials.
     */
    private async getCredentials(): Promise<any> {
        let credentials;
        try {
            credentials = await new SecretManager().getSecret(
                this.credentialsArn,
            );
        } catch (e) {
            console.error('mongodb credentials error', e);
            throw e;
        }
        return credentials[this.workspace] || credentials;
    }
}
