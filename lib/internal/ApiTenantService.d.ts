export declare class ApiTenantService {
    readonly API_TENANTS_BASE_URL: string | undefined;
    /**
     * Get tenant by id
     * @param id Tenant id
     * @param path Paths to get comma separated
     */
    getById(id: string, path?: string): Promise<any>;
}
