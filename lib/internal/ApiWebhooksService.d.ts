export declare class ApiWebhooksService {
    readonly API_WEBHOOKS_BASE_URL: string | undefined;
    createDocument(data: any, options?: any): Promise<any>;
    getDocumentById(legajoId: string, options: any): Promise<any>;
    getDocumentByQuery(query: string, options?: any): Promise<any>;
    exportDocumentToPdf(legajoId: string, fileId: string, mode: "backoffice" | "gdocs", options?: any): Promise<any>;
    getDocumentByMongoDBQuery(query: string, options?: any): Promise<any>;
    updateDocumentById(legajoId: string, data: any, options?: any): Promise<any>;
}
