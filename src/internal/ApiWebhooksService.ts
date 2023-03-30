import axios from 'axios';
import { JSONUtils } from '../utils/JSONUtils';

export class ApiWebhooksService {
    readonly API_WEBHOOKS_BASE_URL: string | undefined =
        process.env.API_WEBHOOKS_BASE_URL;

    async createDocument(data: any, options: any = {}): Promise<any> {
        if (!this.API_WEBHOOKS_BASE_URL) {
            throw `api webhooks url not defined`;
        }
        options = Object.assign(options, {
            'Content-Type': 'application/json',
            workspace: options?.workspace || '62195d46c8b99af141555eb6',
        });

        const url = `${this.API_WEBHOOKS_BASE_URL}/1.0/legajo/`;
        let response = null;
        try {
            response = await axios.post(url, data, {
                headers: {
                    ...options,
                },
            });
        } catch (error) {
            console.log('Error creating document', error);
            throw error;
        }
        return response?.data;
    }

    async getDocumentById(legajoId: string, options: any): Promise<any> {
        if (!this.API_WEBHOOKS_BASE_URL) {
            throw `api webhooks url not defined`;
        }
        options = Object.assign(options, {
            'Content-Type': 'application/json',
            workspace: options?.workspace || '62195d46c8b99af141555eb6',
        });

        const url = `${this.API_WEBHOOKS_BASE_URL}/1.0/legajo/${legajoId}`;

        let response: any;
        try {
            response = await axios.get(url, {
                headers: {
                    ...options,
                },
            });
        } catch (error) {
            console.log('Document error: ', error);
            throw new Error('cannot get document');
        }
        return response?.data;
    }

    async getDocumentByQuery(query: string, options: any = {}): Promise<any> {
        if (!this.API_WEBHOOKS_BASE_URL) {
            throw `api webhooks url not defined`;
        }
        options = Object.assign(options, {
            'Content-Type': 'application/json',
            workspace: options?.workspace || '62195d46c8b99af141555eb6',
        });

        const url = `${this.API_WEBHOOKS_BASE_URL}/1.0/legajos?${query}`;

        let response: any;
        try {
            response = await axios.get(url, {
                headers: {
                    ...options,
                },
            });
        } catch (error) {
            console.log('Document error: ', error);
            throw new Error('cannot get document');
        }
        return response?.data;
    }

    async updateDocumentById(
        legajoId: string,
        data: any,
        options: any = {},
    ): Promise<any> {
        if (!this.API_WEBHOOKS_BASE_URL) {
            throw `api webhooks url not defined`;
        }
        options = Object.assign(options, {
            'Content-Type': 'application/json',
            workspace: options?.workspace || '62195d46c8b99af141555eb6',
        });

        const url = `${this.API_WEBHOOKS_BASE_URL}/1.0/legajo/${legajoId}`;
        let response = null;
        try {
            response = await axios.put(url, data, {
                headers: {
                    ...options,
                },
            });
        } catch (error) {
            console.log('Error updating document', error);
            throw error;
        }
        return response?.data;
    }
}
