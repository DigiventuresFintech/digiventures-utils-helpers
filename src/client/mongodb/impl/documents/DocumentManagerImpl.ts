import { BaseMongooseRepositoryImpl } from '../../BaseMongooseRepositoryImpl';
import {createModel, IDocument} from '../../models/Document';
import { IDocumentManager } from './IDocumentManager';
import {Connection} from "mongoose";

export class DocumentManagerImpl
    extends BaseMongooseRepositoryImpl<IDocument>
    implements IDocumentManager
{
    constructor(connection?: Connection) {
        super(
            createModel(connection)
        );
    }
}
