import { IBaseClientConnection } from "../IBaseClientConnection";
import { Client } from '@elastic/elasticsearch'
import { SecretManager } from "../../services/secret/SecretManager";

export class ElasticSearchConnection implements IBaseClientConnection {
  /**
   * ElasticSearch client instance
   */
  private client: Client|null
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
  private readonly DEFAULT_ELASTICSEARCH_CREDENTIALS_ARN =
    'arn:aws:secretsmanager:us-east-1:810659965432:secret:elasticsearch_credentials_dev-3us0AX';

  constructor(options?: any) {
    this.client = null;
    this.workspace = options?.workspace || 'default';
    this.credentialsArn =
      options?.credentialsArn ||
      process.env.MONGODB_CREDENTIALS_ARN ||
      this.DEFAULT_ELASTICSEARCH_CREDENTIALS_ARN;
  }

  async connect(): Promise<any> {
    if (!this.client) {
      const credentials = await this.getCredentials();

      if (credentials) {
        const { url, credentials: auth = {} } = credentials;

        this.client = new Client({
          node: url,
          auth,
        });

        try {
          await this.client.ping({}, { requestTimeout: 20000 })
          console.log('Elasticsearch client successfully connected..')
        } catch (e) {
          console.error('Elasticsearch client cannot be connected', e)
          throw new Error('Elasticsearch client cannot be connected')
        }
      }
    }
    return this.client;
  }

  async close(): Promise<void> {
    if (this.client) {
      try {
        await this.client.close()
      } catch (e) {
        console.error('error closing Elasticsearch client', e)
        throw new Error('error closing Elasticsearch client')
      }
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
      console.error('elasticsearch credentials error', e);
      throw e;
    }
    return credentials[this.workspace] || credentials;
  }
}
