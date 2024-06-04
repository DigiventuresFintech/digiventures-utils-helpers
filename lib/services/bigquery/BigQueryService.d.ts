export declare class BigQueryService {
    private instance;
    init(projectId?: string): void;
    query(query: string, options?: any): Promise<any>;
}
