import { IElasticBaseRepository, TDoc } from './IElasticBaseRepository';
import { Client } from '@elastic/elasticsearch';
export declare class BaseElasticRepositoryImpl<T = any> implements IElasticBaseRepository<T> {
    private client;
    private readonly indexName;
    constructor(_client: Client, _indexName: string);
    insertDocument<T = Record<string, any>>(doc: T): Promise<any>;
    updateById(id: string, body: TDoc): Promise<any>;
    updateByIndex(id: string, body: TDoc): Promise<any>;
    createAlias(aliasName: string, indexName: string[]): Promise<any>;
    addIndexToAlias(indexName: string, aliasName: string): Promise<any>;
    deleteById(id: string): Promise<any>;
}
