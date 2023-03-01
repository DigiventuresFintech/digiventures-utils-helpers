export declare class ApiWebhooksService {
    readonly API_WEBHOOKS_BASE_URL: string | undefined;
    getDocumentById(legajoId: string, authKey: string): Promise<any>;
    updateDocumentById(
        legajoId: string,
        authKey: string,
        data: any,
        params?: {},
        notify?: string,
    ): Promise<import('axios').AxiosResponse<any, any>>;
}
