export declare class ApiDocumentsService {
    readonly API_DOCUMENTS_BASE_URL: string | undefined;
    update(id: string, data: any, prefix: string, workspace?: string): Promise<void>;
}
