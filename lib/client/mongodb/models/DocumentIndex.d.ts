import mongoose from 'mongoose';
export interface IDocumentIndex extends mongoose.Document {
    metadata: string;
    tenantId: mongoose.Types.ObjectId;
    workspaceId: mongoose.Types.ObjectId;
    documentId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
