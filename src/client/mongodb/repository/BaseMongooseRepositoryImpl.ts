import {
  FilterQuery,
  Model,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';
import { IBaseRepository } from './IBaseRepository';

export class BaseMongooseRepositoryImpl<T extends object>
  implements IBaseRepository<T>
{
  private model: Model<T>;
  protected populate: string[];

  constructor(repository: Model<T>, populate: string[] = []) {
    this.model = repository;
    this.populate = populate;
  }

  async getById(id: string): Promise<T> {
    const entity = await this.model
      .findOne({ _id: id } as FilterQuery<T>)
      .populate(this.populate)
      .lean();

    if (!entity) {
      throw new Error('entity not found');
    }

    return entity as any;
  }

  async findOne(
    condition: Record<string, any>,
    projection?: Record<string, any>,
  ): Promise<T> {
    const entity = await this.model
      .findOne(
        condition as FilterQuery<T>,
        (projection as ProjectionType<T>) || {},
      )
      .populate(this.populate)
      .lean();

    if (!entity) {
      throw new Error('entity not found');
    }

    return entity as any;
  }

  async getBy(
    condition: Record<string, any>,
    projection?: Record<string, any>,
  ): Promise<T[]> {
    try {
      const entity = await this.model
        .find(
          condition as FilterQuery<T>,
          (projection as ProjectionType<T>) || {},
        )
        .lean({ getters: true });

      if (!entity) {
        throw new Error('entity not found');
      }
      return entity as any[];
    } catch (e) {
      throw e;
    }
  }

  async updateMany(
    condition: Record<string, any>,
    params: Record<string, any>,
  ): Promise<any> {
    const output = await this.model.updateMany(
      condition as FilterQuery<T>,
      params as UpdateQuery<T>,
    );

    if (!output) {
      throw new Error('entities not found');
    }

    return output;
  }

  async updateOne(
    condition: Record<string, any>,
    params: Record<string, any>,
    options?: any,
  ): Promise<T> {
    const output = await this.model.updateOne(
      condition as FilterQuery<T>,
      params as UpdateQuery<T>,
      (options as QueryOptions<T>) || null,
    );

    if (!output) {
      throw new Error('entities not found');
    }

    return output as any;
  }

  async findOneAndUpdate(
    condition: Record<string, any>,
    params: Record<string, any>,
    options?: any,
  ): Promise<T> {
    const output = await this.model.findOneAndUpdate(
      condition as FilterQuery<T>,
      params as UpdateQuery<T>,
      (options as QueryOptions<T>) || null,
    );

    if (!output) {
      throw new Error('entities not found');
    }

    return output as any;
  }

  async insertMany(documents: any[]): Promise<any> {
    try {
      const result = await this.model.insertMany(documents);
      return result as any[];
    } catch (error) {
      throw new Error('Error inserting documents');
    }
  }

  async deleteMany(conditions: Record<string, any>): Promise<any> {
    try {
      const result = await this.model.deleteMany(conditions).lean();
      return result as unknown as any[];
    } catch (error) {
      throw new Error('Error deleting documents');
    }
  }
}
