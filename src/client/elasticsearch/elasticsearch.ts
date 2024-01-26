import { Client } from '@elastic/elasticsearch';
import { ElasticSearchConnection } from './ElasticSearchConnection';

namespace Elastic {
  const connection = new ElasticSearchConnection();

  let instance: Client | null = null;
  export async function connect(): Promise<any> {
    instance = await connection.connect();
  }
  export async function close(): Promise<any> {
    await connection.close();
    instance = null;
  }
  export async function client(): Promise<any> {
    if (instance == null) await connect();
    return instance as Client;
  }
}
