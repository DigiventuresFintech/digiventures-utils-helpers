import { IBaseRepository } from './IBaseRepository';
export declare class BaseAppServiceRepositoryImpl<T extends object> implements IBaseRepository<T> {
    private readonly collection;
    private readonly options;
    private DEFAULT_MONGO_APP_SERVICE_BASE_PATH;
    constructor(collection: string, options: any);
    findOne(condition: Record<string, any>, projection?: Record<string, any>): Promise<T>;
    findOneAndUpdate(condition: Record<string, any>, params: Record<string, any>, options?: any): Promise<T>;
    getBy(condition: Record<string, any>): Promise<T[]>;
    getById(id: string): Promise<T>;
    updateMany(condition: Record<string, any>, params: Record<string, any>): Promise<any>;
    updateOne(condition: Record<string, any>, params: Record<string, any>, options?: any): Promise<T>;
    getData(): any;
    getAppId(): string;
    getBasePath(): string;
}
