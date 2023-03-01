import { JSONUtils } from '../utils/JSONUtils';
import axios from 'axios';

export class ApiDocumentsService {
    readonly API_DOCUMENTS_BASE_URL: string | undefined =
        process.env.API_DOCUMENTS_BASE_URL;

    public async update(
        id: string,
        data: any,
        prefix: string,
        workspace?: string,
    ): Promise<any> {
        if (!this.API_DOCUMENTS_BASE_URL) {
            throw `api documents url not defined`;
        }

        const flattenedObject = JSONUtils.flattenObject(data, prefix);
        console.log('Document to update', flattenedObject);

        try {
            const response = await axios.put(
                `${this.API_DOCUMENTS_BASE_URL}/legajo/${id}`,
                flattenedObject,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        workspace: workspace || '62195d46c8b99af141555eb6',
                    },
                },
            );
            console.log('Updated legajo:', response.data);
            return response?.data;
        } catch (e) {
            console.error('Error update legajo:', e);
            throw e;
        }
    }
}
