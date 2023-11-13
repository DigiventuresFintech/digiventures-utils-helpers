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
     * Mongodb config options
     */
    private readonly options?: any;
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
        this.options = options || {};
        this.credentialsArn =
            options?.credentialsArn ||
            process.env.MONGODB_CREDENTIALS_ARN ||
            this.DEFAULT_MONGODB_CREDENTIALS_ARN;
    }

    connect(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            if (this.conn) {
                resolve(this.conn);
                return;
            }

            try {
                let uri: string | undefined =
                    this.options?.uri ??
                    (await this.getCredentials())?.mongodb?.connection?.string;
                if (!uri) {
                    reject(new Error('mongodb uri not defined'));
                    return;
                }
                this.conn = await mongoose.connect(uri);
                console.log('mongodb successfully connected');
                resolve(this.conn);
            } catch (e) {
                console.error('error mongodb connection', e);
                reject(e);
            }
        });
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
