import { BaseMongooseRepositoryImpl } from '../../repository/BaseMongooseRepositoryImpl';
import { CreateDocumentSchema, IDocument } from '../../models/Document';
import { IDocumentManager } from './IDocumentManager';
import { Connection } from 'mongoose';
import { CreateModel } from '../../common';
import { IElasticDocumentManager } from '../../../elasticsearch/manager/IElasticDocumentManager';

export class DocumentMongooseElasticManagerImpl
  extends BaseMongooseRepositoryImpl<IDocument>
  implements IDocumentManager
{
  constructor(
    private elasticSearchManager: IElasticDocumentManager,
    connection?: Connection,
  ) {
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

  async findOneAndUpdate(
    condition: Record<string, any>,
    params: Record<string, any>,
    options?: any,
  ): Promise<IDocument> {
    options = { ...options, new: true };

    const result = await super.findOneAndUpdate(condition, params, options);
    try {
      if (this.needsElasticsearchUpdate(params) && result._id) {
        const id = result._id.toString();
        const { status, typeScoring, totalComplete } = result;
        const body = { doc: { status, typeScoring, totalComplete } };

        // Update Elasticsearch
        await this.elasticSearchManager.updateById(id, body);
        console.log('ElasticSearch updated successfully');
      }
    } catch (error) {
      console.error(`Error during ElasticSearch update: ${error}`);
    }

    return result;
  }

  async updateOne(
    condition: Record<string, any>,
    params: Record<string, any>,
    options?: any,
  ): Promise<IDocument> {
    options = { ...options, new: true };

    const result = await super.updateOne(condition, params, options);
    try {
      if (this.needsElasticsearchUpdate(params) && result._id) {
        const id = result._id.toString();
        const { status, typeScoring, totalComplete } = result;
        const body = { doc: { status, typeScoring, totalComplete } };

        // Update Elasticsearch
        await this.elasticSearchManager.updateById(id, body);
        console.log('ElasticSearch updated successfully');
      }
    } catch (error) {
      console.error(`Error during ElasticSearch update: ${error}`);
    }

    return result;
  }

  needsElasticsearchUpdate = (params: Record<string, any>) => {
    if (!params?.$set) return false;

    const { status, typeScoring, totalComplete } = params.$set!;
    return Boolean(status || typeScoring || totalComplete);
  };

  convertStringToProjection = (projectionString: string) => {
    const fields = projectionString.split(' ');
    const projection: any = {};

    fields.forEach(field => {
      projection[field] = 1;
    });
    return projection;
  };
}
