import { IElasticBaseRepository, TDoc } from './IElasticBaseRepository';
import { Client } from '@elastic/elasticsearch';

export class BaseElasticRepositoryImpl<T> implements IElasticBaseRepository<T> {
    private client: Client;
    private readonly indexName: string;

    constructor(_client: Client, _indexName: string) {
        this.client = _client;
        this.indexName = _indexName;
    }

    async updateById(id: string, body: TDoc): Promise<any> {
        try {
            return await this.client.update({
                index: this.indexName,
                id: id,
                body,
            });
        } catch (e) {
            console.error('elasticsearch update error', e);
            throw e;
        }
    }

    async updateByIndex(id: string, body: TDoc): Promise<any> {
        try {
            return await this.client.index({
                index: this.indexName,
                id: id,
                body,
            });
        } catch (e) {
            console.error('elasticsearch index error', e);
            throw e;
        }
    }
}
