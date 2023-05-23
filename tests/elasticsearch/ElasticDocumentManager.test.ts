import { IBaseClientConnection } from "../../src";
import { ElasticSearchConnection } from "../../src/client/elasticsearch/ElasticSearchConnection";
import { Client } from "@elastic/elasticsearch";
import { IElasticDocumentManager } from "../../src/client/elasticsearch/manager/IElasticDocumentManager";
import { ElasticDocumentManagerImpl } from "../../src/client/elasticsearch/manager/ElasticDocumentManagerImpl";

describe(__filename, () => {

  test('should success update document by id on elastic', async () => {
    const connection:IBaseClientConnection = new ElasticSearchConnection();
    const client: Client = await connection.connect();

    const elasticDocumentManager: IElasticDocumentManager = new ElasticDocumentManagerImpl(client)

    let conditions: Record<string, any> = {
      typeScoring: 'Segunda gestión',
    };
    await elasticDocumentManager.update('64594e48285ccf00127bef80', conditions)
  }, 50000)

})
