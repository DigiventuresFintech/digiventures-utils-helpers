import { BaseMongooseRepositoryImpl } from '../../repository/BaseMongooseRepositoryImpl';
import { IDocumentManager } from './IDocumentManager';
import { Connection } from 'mongoose';
import { IDocument } from '../../models/Document';
export declare class DocumentManagerImpl extends BaseMongooseRepositoryImpl<IDocument> implements IDocumentManager {
    constructor(connection?: Connection);
    getById(id: string, options?: any): Promise<IDocument>;
    findOne(condition: Record<string, any>, options?: any): Promise<IDocument>;
    getBy(condition: Record<string, any>, options?: any): Promise<IDocument[]>;
    updateOne(condition: Record<string, any>, params: Record<string, any>, options?: any): Promise<IDocument>;
    findOneAndUpdate(condition: Record<string, any>, params: Record<string, any>, options?: any): Promise<IDocument>;
}
