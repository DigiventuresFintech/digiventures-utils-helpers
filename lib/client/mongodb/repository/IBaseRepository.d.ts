export interface IBaseRepository<T = any> {
    getById(id: string): Promise<T>;
    findOne(condition: Record<string, any>, projection?: Record<string, any>): Promise<T>;
    getBy(condition: Record<string, any>, projection?: Record<string, any>): Promise<T[]>;
    updateMany(condition: Record<string, any>, params: Record<string, any>, options?: any): Promise<any>;
    updateOne(condition: Record<string, any>, params: Record<string, any>, options?: any): Promise<T>;
    findOneAndUpdate(condition: Record<string, any>, params: Record<string, any>, options?: any): Promise<T>;
    insertMany(documents: any): Promise<any>;
    deleteMany(conditions: Record<string, any>): Promise<any>;
}
