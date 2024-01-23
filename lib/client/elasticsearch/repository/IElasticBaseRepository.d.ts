export interface TDoc<T = Record<string, any>> {
    doc: T;
}
export interface IElasticBaseRepository<T> {
    insertDocument<T = Record<string, any>>(doc: T): Promise<any>;
    updateById(id: string, body: TDoc): Promise<any>;
    updateByIndex(id: string, body: TDoc): Promise<any>;
    createAlias(aliasName: string, indexName: string[]): Promise<any>;
    addIndexToAlias(indexName: string, aliasName: string): Promise<any>;
    deleteById(id: string): Promise<any>;
}
