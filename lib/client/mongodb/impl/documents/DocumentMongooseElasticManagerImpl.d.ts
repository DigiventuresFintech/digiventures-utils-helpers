import { BaseMongooseRepositoryImpl } from '../../repository/BaseMongooseRepositoryImpl';
import { IDocument } from '../../models/Document';
import { IDocumentManager } from './IDocumentManager';
import { Connection } from 'mongoose';
import { IElasticDocumentManager } from '../../../elasticsearch/manager/IElasticDocumentManager';
export declare class DocumentMongooseElasticManagerImpl extends BaseMongooseRepositoryImpl<IDocument> implements IDocumentManager {
    private elasticSearchManager;
    constructor(elasticSearchManager: IElasticDocumentManager, connection?: Connection);
    getById(id: string, options?: any): Promise<IDocument>;
    findOne(condition: Record<string, any>, options?: any): Promise<IDocument>;
    getBy(condition: Record<string, any>, options?: any): Promise<IDocument[]>;
    findOneAndUpdate(condition: Record<string, any>, params: Record<string, any>, options?: any): Promise<IDocument>;
    updateOne(condition: Record<string, any>, params: Record<string, any>, options?: any): Promise<IDocument>;
    needsElasticsearchUpdate: (params: Record<string, any>) => boolean;
    convertStringToProjection: (projectionString: string) => any;
}
