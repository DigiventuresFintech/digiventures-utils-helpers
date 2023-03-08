export declare class ApiWebhooksService {
    readonly API_WEBHOOKS_BASE_URL: string | undefined;
    createDocument(data: any, options?: any): Promise<any>;
    getDocumentById(legajoId: string, options?: any): Promise<any>;
    updateDocumentById(legajoId: string, data: any, prefix: string, options?: any): Promise<any>;
}
