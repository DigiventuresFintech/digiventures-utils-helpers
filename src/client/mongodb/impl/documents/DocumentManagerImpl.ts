import { BaseMongooseRepositoryImpl } from '../../repository/BaseMongooseRepositoryImpl';
import { IDocumentManager } from './IDocumentManager';
import { Connection } from 'mongoose';
import { createModel } from '../../common';
import { CreateDocumentSchema, IDocument } from '../../models/Document';

export class DocumentManagerImpl
  extends BaseMongooseRepositoryImpl<IDocument>
  implements IDocumentManager
{
  constructor(connection?: Connection) {
    super(
      createModel(
        'legajos',
        encryption => CreateDocumentSchema(encryption),
        connection,
      ),
    );
  }

  async getById(id: string, options?: any): Promise<IDocument> {
    if (options?.projection && typeof options.projection === 'string') {
      const projection = options.projection;
      options = {
        ...options,
        projection: this.convertStringToProjection(projection),
      };
    }

    return await super.getById(id, options);
  }

  async findOne(
    condition: Record<string, any>,
    options?: any,
  ): Promise<IDocument> {
    if (options?.projection && typeof options.projection === 'string') {
      const projection = options.projection;
      options = {
        ...options,
        projection: this.convertStringToProjection(projection),
      };
    }

    return await super.findOne(condition, options);
  }

  async getBy(
    condition: Record<string, any>,
    options?: any,
  ): Promise<IDocument[]> {
    if (options?.projection && typeof options.projection === 'string') {
      const projection = options.projection;
      options = {
        ...options,
        projection: this.convertStringToProjection(projection),
      };
    }

    return super.getBy(condition, options);
  }

  async updateOne(
    condition: Record<string, any>,
    params: Record<string, any>,
    options?: any,
  ): Promise<IDocument> {
    if (options?.projection && typeof options.projection === 'string') {
      const projection = options.projection;
      options = {
        ...options,
        projection: this.convertStringToProjection(projection),
      };
    }

    return await super.updateOne(condition, params, options);
  }

  async findOneAndUpdate(
    condition: Record<string, any>,
    params: Record<string, any>,
    options?: any,
  ): Promise<IDocument> {
    if (options?.projection && typeof options.projection === 'string') {
      const projection = options.projection;
      options = {
        ...options,
        projection: this.convertStringToProjection(projection),
      };
    }

    return await super.findOneAndUpdate(condition, params, options);
  }
}
