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

  async getById(id: string, options?: any): Promise<T> {
    if (options?.projection && typeof options.projection === 'string') {
      const projection = options.projection;
      options = {
        ...options,
        projection: this.convertStringToProjection(projection),
      };
    }

    const entity = await this.model
      .findOne(
        { _id: id } as FilterQuery<T>,
        (options?.projection as ProjectionType<T>) || {},
      )
      .populate(this.populate)
      .lean();

    if (!entity) {
      throw new Error('entity not found');
    }

    return entity as any;
  }

  async findOne(condition: Record<string, any>, options?: any): Promise<T> {
    if (options?.projection && typeof options.projection === 'string') {
      const projection = options.projection;
      options = {
        ...options,
        projection: this.convertStringToProjection(projection),
      };
    }

    const entity = await this.model
      .findOne(
        condition as FilterQuery<T>,
        (options?.projection as ProjectionType<T>) || {},
      )
      .populate(this.populate)
      .lean();

    if (!entity) {
      throw new Error('entity not found');
    }

    return entity as any;
  }

  async getBy(condition: Record<string, any>, options?: any): Promise<T[]> {
    if (options?.projection && typeof options.projection === 'string') {
      const projection = options.projection;
      options = {
        ...options,
        projection: this.convertStringToProjection(projection),
      };
    }

    try {
      const entity = await this.model
        .find(
          condition as FilterQuery<T>,
          (options?.projection as ProjectionType<T>) || {},
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
    options?: any,
  ): Promise<any> {
    const output = await this.model.updateMany(
      condition as FilterQuery<T>,
      params as UpdateQuery<T>,
      (options as QueryOptions<T>) || null,
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
    const output = await this.model
      .updateOne(
        condition as FilterQuery<T>,
        params as UpdateQuery<T>,
        (options as QueryOptions<T>) || null,
      )
      .lean();

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
    const output = await this.model
      .findOneAndUpdate(
        condition as FilterQuery<T>,
        params as UpdateQuery<T>,
        (options as QueryOptions<T>) || null,
      )
      .lean();

    if (!output) {
      throw new Error('entities not found');
    }

    return output as any;
  }

  async insertMany(documents: any[]): Promise<any> {
    try {
      const result = await this.model.insertMany(documents, { lean: true });
      return result as any[];
    } catch (error) {
      throw error;
    }
  }

  async deleteMany(conditions: Record<string, any>): Promise<any> {
    try {
      const result = await this.model.deleteMany(conditions).lean();
      return result as unknown as any[];
    } catch (error) {
      throw error;
    }
  }

  convertStringToProjection = (projectionString: string) => {
    const fields = projectionString.split(' ');
    const projection: any = {};

    fields.forEach(field => {
      const parts = field.split('.');
      let current = projection;

      parts.forEach((part, index) => {
        if (index === parts.length - 1) {
          current[part] = 1;
        } else {
          if (!current[part] || typeof current[part] !== 'object') {
            current[part] = {};
          }
          current = current[part];
        }
      });
    });

    return projection;
  };
}
