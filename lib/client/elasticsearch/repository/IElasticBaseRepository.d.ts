export interface TDoc<T = Record<string, any>> {
    doc: T;
}
export interface IElasticBaseRepository<T> {
    updateById(id: string, body: TDoc): Promise<any>;
    updateByIndex(id: string, body: TDoc): Promise<any>;
}
