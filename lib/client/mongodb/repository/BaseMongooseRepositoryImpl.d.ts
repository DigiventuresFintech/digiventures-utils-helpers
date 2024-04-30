/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
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
