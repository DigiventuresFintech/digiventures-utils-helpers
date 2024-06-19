import { IBaseClientConnection } from '../../src';
import { ElasticSearchConnection } from '../../src';
import { Client } from '@elastic/elasticsearch';
import { IElasticDocumentManager } from '../../src';
import { ElasticDocumentManagerImpl } from '../../src';

describe(__filename, () => {
  test.skip('should success update document by id on elastic', async () => {
    const connection: IBaseClientConnection = new ElasticSearchConnection();
    const client: Client = await connection.connect();

    const elasticDocumentManager: IElasticDocumentManager =
      new ElasticDocumentManagerImpl(client);

    let conditions: Record<string, any> = {
      typeScoring: 'Segunda gestión',
    };
    await elasticDocumentManager.update('64594e48285ccf00127bef80', conditions);
  }, 50000);
});
