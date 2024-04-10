import { IBaseRepository } from './IBaseRepository';
import axios from 'axios';

export class BaseAppServiceRepositoryImpl<T extends object>
  implements IBaseRepository<T>
{
  private readonly collection: string;
  private readonly options: any;
  private DEFAULT_MONGO_APP_SERVICE_BASE_PATH: string =
    'https://us-east-1.aws.data.mongodb-api.com/app/onboarding-flows-app-qa-gtann/endpoint/data/v1';

  constructor(collection: string, options: any) {
    this.collection = collection;
    this.options = options;
  }

  async findOne(
    condition: Record<string, any>,
    projection?: Record<string, any>,
  ): Promise<T> {
    const url = `${this.getBasePath()}/action/findOne`;

    const data = Object.assign({}, this.getData(), { filter: condition });
    try {
      const res = await axios.post(url, data, {
        headers: {
          apiKey: this.getAppId(),
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const entity = res?.data?.document;

      if (!entity) {
        throw new Error('Entity not found');
      }

      return entity as T;
    } catch (e) {
      console.error('findOne error', e);
      throw e;
    }
  }

  async findOneAndUpdate(
    condition: Record<string, any>,
    params: Record<string, any>,
    options?: any,
  ): Promise<T> {
    //  TODO: Not implemented in app service
    return Promise.resolve({} as T);
  }

  async getBy(condition: Record<string, any>): Promise<T[]> {
    const url = `${this.getBasePath()}/action/find`;

    const data = Object.assign({}, this.getData(), { filter: condition });
    try {
      const res = await axios.post(url, data, {
        headers: {
          apiKey: this.getAppId(),
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      return res?.data as T[];
    } catch (e) {
      console.error('getBy error', e);
      throw e;
    }
  }

  async getById(id: string): Promise<T> {
    const url = `${this.getBasePath()}/action/findOne`;
    const data = Object.assign({}, this.getData(), {
      filter: {
        _id: { $oid: id },
      },
    });

    try {
      const headers = {
        apiKey: this.getAppId(),
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };

      const res = await axios.post(url, data, { headers });
      const entity = res?.data?.document;

      if (!entity) {
        throw new Error('Entity not found');
      }

      return entity as T;
    } catch (error) {
      console.error('getById error', error);
      throw error;
    }
  }

  async updateMany(
    condition: Record<string, any>,
    params: Record<string, any>,
  ): Promise<any> {
    const url = `${this.getBasePath()}/action/updateMany`;

    const data = Object.assign({}, this.getData(), {
      filter: condition,
      update: params,
    });
    try {
      const res = await axios.post(url, data, {
        headers: {
          apiKey: this.getAppId(),
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      return res?.data as T;
    } catch (e) {
      console.error('updateMany error', e);
      throw e;
    }
  }

  async updateOne(
    condition: Record<string, any>,
    params: Record<string, any>,
    options?: any,
  ): Promise<T> {
    const url = `${this.getBasePath()}/action/updateOne`;

    const data = Object.assign({}, this.getData(), {
      filter: condition,
      update: params,
    });
    try {
      const res = await axios.post(url, data, {
        headers: {
          apiKey: this.getAppId(),
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      return res?.data as T;
    } catch (e) {
      console.error('updateMany error', e);
      throw e;
    }
  }

  getData(): any {
    return {
      collection: this.collection,
      dataSource:
        this.options?.dataSource ||
        process.env.MONGO_APP_SERVICE_DEFAULT_DATASOURCE ||
        'mongodb-atlas',
      database:
        this.options?.database ||
        process.env.MONGO_APP_SERVICE_DEFAULT_DATABASE ||
        'mongodb-atlas',
    };
  }

  getAppId(): string {
    return (
      this.options?.apiKey || (process.env.MONGO_APP_SERVICE_API_KEY as string)
    );
  }

  getBasePath(): string {
    return (
      this.options?.basePath ||
      (process.env.MONGO_APP_SERVICE_BASE_PATH as string) ||
      this.DEFAULT_MONGO_APP_SERVICE_BASE_PATH
    );
  }

  async insertMany(documents: any[]): Promise<any> {
    //  TODO: Not implemented in app service
    return Promise.resolve({} as T);
  }

  async deleteMany(conditions: Record<string, any>): Promise<any> {
    //  TODO: Not implemented in app service
    return Promise.resolve({} as T);
  }
}
