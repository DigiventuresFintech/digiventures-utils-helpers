import { IElasticDocumentManager } from "./IElasticDocumentManager";
import { BaseElasticRepositoryImpl } from "../repository/BaseElasticRepositoryImpl";
import { Client } from "@elastic/elasticsearch";

export class ElasticDocumentManagerImpl extends BaseElasticRepositoryImpl<ElasticSearch.Document> implements IElasticDocumentManager {

  constructor(client: Client) {
    super(client, 'default_legajos');
  }

  update(id: string, body: Record<string, any>): Promise<any> {
    if (!body['updatedAt']) {
      body['updatedAt'] = new Date().toISOString()
    }
    return this.updateById(id, body)
  }
}
