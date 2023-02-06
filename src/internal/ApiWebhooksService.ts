import axios from 'axios';

export class ApiWebhooksService {
    readonly API_WEBHOOKS_BASE_URL: string | undefined =
        process.env.API_WEBHOOKS_BASE_URL;

    async getDocumentById(legajoId: string, authKey: string) {
        if (!this.API_WEBHOOKS_BASE_URL) {
            throw `api webhooks url not defined`;
        }

        const url = `${this.API_WEBHOOKS_BASE_URL}/1.0/legajo/${legajoId}?authorization=${authKey}`;

        let response: any;
        try {
            response = await axios.get(url);
        } catch (error) {
            console.log('Document error: ', error);
            throw new Error('cannot get document');
        }
        return response?.data;
    }

    async updateDocumentById(
        legajoId: string,
        authKey: string,
        data: any,
        params = {},
        notify = 'true',
    ) {
        if (!this.API_WEBHOOKS_BASE_URL) {
            throw `api webhooks url not defined`;
        }

        //const queryParams = qs.stringify(params);
        const url = `${this.API_WEBHOOKS_BASE_URL}/1.0/legajo/${legajoId}?authorization=${authKey}&${params}`;

        let response = null;
        try {
            response = axios.put(url, data, { headers: { notify } });
        } catch (error) {
            console.log('Error updating document', error);
            throw error;
        }
        return response;
    }
}