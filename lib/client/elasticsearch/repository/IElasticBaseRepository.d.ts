export interface IElasticBaseRepository<T> {
    updateById(id: string, body: Record<string, any>): Promise<any>;
}
