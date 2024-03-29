import { Model } from 'mongoose';
import { IBaseRepository } from './IBaseRepository';
export declare class BaseMongooseRepositoryImpl<T extends object> implements IBaseRepository<T> {
    private model;
    protected populate: string[];
    constructor(repository: Model<T>, populate?: string[]);
    getById(id: string): Promise<T>;
    findOne(condition: Record<string, any>, projection?: Record<string, any>): Promise<T>;
    getBy(condition: Record<string, any>, projection?: Record<string, any>): Promise<T[]>;
    updateMany(condition: Record<string, any>, params: Record<string, any>): Promise<any>;
    updateOne(condition: Record<string, any>, params: Record<string, any>, options?: any): Promise<T>;
    findOneAndUpdate(condition: Record<string, any>, params: Record<string, any>, options?: any): Promise<T>;
    insertMany(documents: any[]): Promise<any>;
    deleteMany(conditions: Record<string, any>): Promise<any>;
}
