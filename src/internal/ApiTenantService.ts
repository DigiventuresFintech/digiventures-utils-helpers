import axios from "axios";

export class ApiTenantService {
  readonly API_TENANTS_BASE_URL: string | undefined =
    process.env.API_TENANTS_BASE_URL;

  /**
   * Get tenant by id
   * @param id Tenant id
   */
  async getById(id: string): Promise<any> {
    if (!this.API_TENANTS_BASE_URL) {
      throw `api tenants url not defined`;
    }

    const url = `${this.API_TENANTS_BASE_URL}/workspace/${id}`;
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