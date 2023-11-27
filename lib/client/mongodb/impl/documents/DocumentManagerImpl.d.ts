import { BaseMongooseRepositoryImpl } from '../../BaseMongooseRepositoryImpl';
import { IDocument } from '../../models/Document';
import { IDocumentManager } from './IDocumentManager';
export declare class DocumentManagerImpl
    extends BaseMongooseRepositoryImpl<IDocument>
    implements IDocumentManager
{
    constructor();
}
