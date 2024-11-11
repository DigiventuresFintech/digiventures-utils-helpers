import axios from 'axios';

interface QueryParams {
  fields?: string;
  page?: number;
  limit?: number;
  sort?: string;
  filter?: string;
}

interface User {
  _id: string;
  role: string;
}

interface ErrorResponse {
  code: string;
  message: string;
  reason: string;
  buyer: any | null;
}

export class ApiBuyerService {
  readonly API_DOCUMENTS_BASE_URL: string | undefined =
    process.env.API_DOCUMENTS_BASE_URL;

  public async createBuyer(
    buyerData: any,
    user: { _id: string; name: string; email: string },
    workspace: string,
  ): Promise<any> {
    try {
      const buyerWithOwners = {
        ...buyerData,
        owners: [
          {
            _id: user._id,
            name: user.name,
            email: user.email,
          },
        ],
      };
      const { data } = await axios.post(
        `${this.API_DOCUMENTS_BASE_URL}/buyers`,
        buyerWithOwners,
        {
          headers: { workspace },
        },
      );

      return data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'Error en la creación del comprador';
      const { code, buyer, reason } = error.response?.data || {};

      throw {
        code,
        message: errorMessage,
        reason,
        buyer,
      };
    }
  }

  public async getBuyers(
    workspace: string,
    user: User,
    queryParams: QueryParams = {},
  ) {
    try {
      const {
        fields = '',
        page = 1,
        limit = 9,
        sort = '{}',
        filter = '{}',
      } = queryParams;

      const { data } = await axios.get(
        `${this.API_DOCUMENTS_BASE_URL}/buyers?filter=${encodeURIComponent(
          filter,
        )}&sort=${sort}&fields=${fields}&page=${page}&limit=${limit}`,
        {
          headers: { workspace },
        },
      );

      return data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'Error al obtener los compradores';

      throw {
        message: errorMessage,
        error: error.message,
      };
    }
  }

  public async updateBuyer(
    id: string,
    buyerData: any,
    workspace: string,
  ): Promise<any> {
    try {
      const { data } = await axios.put(
        `${this.API_DOCUMENTS_BASE_URL}/buyers/${id}`,
        buyerData,
        {
          headers: { workspace },
        },
      );

      return data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        'Error en la actualización del comprador';

      throw {
        code: error.response?.data?.code || 'UNKNOWN_ERROR',
        message: errorMessage,
        reason: error.response?.data?.reason || 'No reason provided',
        buyer: error.response?.data?.buyer || null,
      };
    }
  }

  public async deleteBuyer(id: string, workspace: string): Promise<any> {
    if (!this.API_DOCUMENTS_BASE_URL) {
      throw new Error('API legajos URL not defined');
    }

    try {
      const { data } = await axios.delete(
        `${this.API_DOCUMENTS_BASE_URL}/buyers/${id}`,
        {
          headers: { workspace },
        },
      );

      return data;
    } catch (error: any) {
      throw {
        message: error.message || 'Error al eliminar el comprador',
      };
    }
  }
}
