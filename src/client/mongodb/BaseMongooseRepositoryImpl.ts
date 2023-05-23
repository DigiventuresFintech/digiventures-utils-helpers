import { FilterQuery, Model, ProjectionType, UpdateQuery } from "mongoose";
import { IBaseRepository } from "./IBaseRepository";

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

    async getBy(condition: Record<string, any>, projection?: Record<string, any>): Promise<T[]> {
        //if (entities.length == 0) {
        //    throw new Error('entities not found');
        //}

        return this.model.find(condition as FilterQuery<T>, projection as ProjectionType<T> || {});
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

    async updateOne(condition: Record<string, any>, params: Record<string, any>): Promise<T> {
        const output = await this.model.updateOne(
          condition as FilterQuery<T>,
          params as UpdateQuery<T>,
        );

        if (!output) {
            throw new Error('entities not found');
        }

        return output as any;
    }
}
