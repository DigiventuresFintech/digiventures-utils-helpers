import { BaseMongooseRepositoryImpl } from '../../repository/BaseMongooseRepositoryImpl';
import { IDocumentIndexManager } from './IDocumentIndexManager';
import { IDocumentIndex } from '../../models/DocumentIndex';
import mongoose, { Connection, Schema } from 'mongoose';
import { createModel } from '../../common';

export class DocumentIndexManagerImpl
    extends BaseMongooseRepositoryImpl<IDocumentIndex>
    implements IDocumentIndexManager
{
    constructor(connection?: Connection) {
        super(
            createModel(
                'documents_index',
                () => {
                    return new Schema(
                        {
                            metadata: {
                                type: mongoose.Schema.Types.String,
                                required: true,
                            },
                            tenantId: {
                                type: mongoose.Schema.Types.ObjectId,
                                required: true,
                            },
                            workspaceId: {
                                type: mongoose.Schema.Types.ObjectId,
                                required: true,
                            },
                            documentId: {
                                type: mongoose.Schema.Types.ObjectId,
                                required: true,
                            },
                            createdAt: Date,
                            updatedAt: Date,
                        },
                        {
                            timestamps: true,
                        },
                    );
                },
                connection,
            ),
        );
    }
}
