import axios from "axios";

export class ApiTenantService {
  readonly API_TENANTS_BASE_URL: string | undefined =
    process.env.API_TENANTS_BASE_URL;

  /**
   * Get tenant by id
   * @param id Tenant id
   * @param path Paths to get comma separated
   */
  async getById(id: string, path?: string): Promise<any> {
    if (!this.API_TENANTS_BASE_URL) {
      throw `api tenants url not defined`;
    }

    const queryParams: string = path ? `?select=${path}` : ""
    const url = `${this.API_TENANTS_BASE_URL}/tenant/${id}${queryParams}`;
    let response: any;
    try {
      response = await axios.get(url);
    } catch (error) {
      console.log('Error getting tenant: ', error);
      throw new Error('tenant cannot be obtained');
    }
    return response?.data;
  }
}