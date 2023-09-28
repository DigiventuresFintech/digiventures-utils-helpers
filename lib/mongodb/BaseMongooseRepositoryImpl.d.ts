import { Model } from 'mongoose';
import { IBaseRepository } from './IBaseRepository';
export declare class BaseMongooseRepositoryImpl<T extends object>
    implements IBaseRepository<T>
{
    private model;
    protected populate: string[];
    constructor(repository: Model<T>, populate?: string[]);
    getById(id: string): Promise<T>;
    getBy(condition: Record<string, any>): Promise<T[]>;
    updateMany(
        condition: Record<string, any>,
        params: Record<string, any>,
    ): Promise<any>;
}
