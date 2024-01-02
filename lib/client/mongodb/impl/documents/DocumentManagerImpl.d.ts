import { BaseMongooseRepositoryImpl } from '../../BaseMongooseRepositoryImpl';
import { IDocumentManager } from './IDocumentManager';
import { Connection } from "mongoose";
import { IDocument } from "../../models/Document";
export declare class DocumentManagerImpl extends BaseMongooseRepositoryImpl<IDocument> implements IDocumentManager {
    constructor(connection?: Connection);
}
