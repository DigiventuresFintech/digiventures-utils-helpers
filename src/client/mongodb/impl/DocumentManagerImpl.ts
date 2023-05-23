import { BaseMongooseRepositoryImpl } from '../BaseMongooseRepositoryImpl';
import DocumentModel, { IDocument } from '../models/Document';
import { IDocumentManager } from './IDocumentManager';

export class DocumentManagerImpl
    extends BaseMongooseRepositoryImpl<IDocument>
    implements IDocumentManager
{
    constructor() {
        super(DocumentModel);
    }
}
