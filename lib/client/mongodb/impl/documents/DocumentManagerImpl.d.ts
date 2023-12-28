import { BaseMongooseRepositoryImpl } from '../../BaseMongooseRepositoryImpl';
import { IDocument } from '../../models/Document';
import { IDocumentManager } from './IDocumentManager';
import { Connection } from "mongoose";
export declare class DocumentManagerImpl extends BaseMongooseRepositoryImpl<IDocument> implements IDocumentManager {
    constructor(connection?: Connection);
}
