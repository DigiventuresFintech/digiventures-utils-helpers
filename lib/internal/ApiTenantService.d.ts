export declare class ApiTenantService {
    readonly API_TENANTS_BASE_URL: string | undefined;
    /**
     * Get tenant by id
     * @param id Tenant id
     */
    getById(id: string): Promise<any>;
}
