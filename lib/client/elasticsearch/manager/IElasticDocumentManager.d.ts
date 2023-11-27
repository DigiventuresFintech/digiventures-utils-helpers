import { IElasticBaseRepository } from '../repository/IElasticBaseRepository';
import { ElasticSearch } from '../models/Document';
export interface IElasticDocumentManager extends IElasticBaseRepository<ElasticSearch.Document> {
    update(id: string, body: Record<string, any>): Promise<any>;
    index(id: string, body: Record<string, any>): Promise<any>;
}
