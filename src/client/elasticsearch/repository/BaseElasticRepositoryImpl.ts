import { IElasticBaseRepository, TDoc } from './IElasticBaseRepository';
import { Client } from '@elastic/elasticsearch';

export class BaseElasticRepositoryImpl<T> implements IElasticBaseRepository<T> {
    private client: Client;
    private readonly indexName: string;

    constructor(_client: Client, _indexName: string) {
        this.client = _client;
        this.indexName = _indexName;
    }

    async insertDocument<T = Record<string, any>>(doc: T): Promise<any> {
        try {
            return await this.client.index({
                index: this.indexName,
                body: doc,
            });
        } catch (e) {
            console.error('elasticsearch insert error', e);
            throw e;
        }
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

    async createAlias(aliasName: string, indexName: string[]): Promise<any> {
        try {
            const response = await this.client.indices.putAlias({
                index: indexName,
                name: aliasName,
            });
            console.log('alias created successfully', response);
            return response;
        } catch (e) {
            console.error('alias created error', e);
            throw e;
        }
    }

    async addIndexToAlias(indexName: string, aliasName: string): Promise<any> {
        try {
            const response = await this.client.indices.updateAliases({
                body: {
                    actions: [{ add: { index: indexName, alias: aliasName } }],
                },
            });
            console.log(
                `Index '${indexName}' attached to alias '${aliasName}'`,
                response,
            );
            return response;
        } catch (e) {
            console.error('error updating index', e);
            throw e;
        }
    }

    async deleteById(id: string): Promise<any> {
        try {
            return await this.client.delete({
                index: this.indexName,
                id: id,
            });
        } catch (e) {
            console.error('elasticsearch delete error', e);
            throw e;
        }
    }
}
