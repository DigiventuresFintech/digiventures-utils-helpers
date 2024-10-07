import { BaseMongooseRepositoryImpl } from '../../repository/BaseMongooseRepositoryImpl';
import { IDocumentManager } from './IDocumentManager';
import { Connection } from 'mongoose';
import { CreateModel } from '../../common';
import { CreateDocumentSchema, IDocument } from '../../models/Document';

export class DocumentManagerImpl
  extends BaseMongooseRepositoryImpl<IDocument>
  implements IDocumentManager
{
  constructor(connection?: Connection) {
    super(
      CreateModel(
        'legajos',
        encryption => CreateDocumentSchema(encryption),
        connection,
      ),
    );
  }

  async getById(id: string, options?: any): Promise<IDocument> {
    return await super.getById(id, options);
  }

  async findOne(
    condition: Record<string, any>,
    options?: any,
  ): Promise<IDocument> {
    return await super.findOne(condition, options);
  }

  async getBy(
    condition: Record<string, any>,
    options?: any,
  ): Promise<IDocument[]> {
    return super.getBy(condition, options);
  }

  async updateOne(
    condition: Record<string, any>,
    params: Record<string, any>,
    options?: any,
  ): Promise<IDocument> {
    return await super.updateOne(condition, params, options);
  }

  async findOneAndUpdate(
    condition: Record<string, any>,
    params: Record<string, any>,
    options?: any,
  ): Promise<IDocument> {
    return await super.findOneAndUpdate(condition, params, options);
  }
}
