import { IElasticBaseRepository, TDoc } from './IElasticBaseRepository';
import { Client } from '@elastic/elasticsearch';
export declare class BaseElasticRepositoryImpl<T> implements IElasticBaseRepository<T> {
    private client;
    private readonly indexName;
    constructor(_client: Client, _indexName: string);
    updateById(id: string, body: TDoc): Promise<any>;
    updateByIndex(id: string, body: TDoc): Promise<any>;
}
