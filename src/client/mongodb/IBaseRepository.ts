export interface IBaseRepository<T> {
    getById(id: string): Promise<T>;
    getBy(condition: Record<string, any>): Promise<T[]>;
    updateMany(
        condition: Record<string, any>,
        params: Record<string, any>,
    ): Promise<any>;
    updateOne(
        condition: Record<string, any>,
        params: Record<string, any>,
        options?: any,
    ): Promise<T>;
}
