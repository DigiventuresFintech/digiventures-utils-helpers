import { IElasticBaseRepository } from "./IElasticBaseRepository";
import { Client } from "@elastic/elasticsearch";

export class BaseElasticRepositoryImpl<T> implements IElasticBaseRepository<T> {
  private client: Client
  private readonly indexName: string

  constructor(_client: Client, _indexName: string) {
    this.client = _client;
    this.indexName = _indexName;
  }

  async updateById(id: string, body: Record<string, any>): Promise<any> {
    try {
      const result = await this.client.update({
        index: this.indexName,
        id: id,
        body: {
          doc: body
        }
      })
      console.log('result', result)
    } catch (e) {
      console.error('elasticsearch update error', e)
      throw e
    }

    return Promise.resolve(undefined);
  }

}
