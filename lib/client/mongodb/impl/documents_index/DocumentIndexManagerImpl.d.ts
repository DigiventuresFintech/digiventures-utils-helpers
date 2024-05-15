import { BaseMongooseRepositoryImpl } from '../../repository/BaseMongooseRepositoryImpl';
import { IDocumentIndexManager } from './IDocumentIndexManager';
import { IDocumentIndex } from '../../models/DocumentIndex';
import { Connection } from 'mongoose';
export declare class DocumentIndexManagerImpl extends BaseMongooseRepositoryImpl<IDocumentIndex> implements IDocumentIndexManager {
    constructor(connection?: Connection);
}
