import axios from 'axios';

export class RestUtils {

    /**
     * Gets public file by url as arraybuffer
     * @param document File to load
     */
    public async getBase64File(document: string): Promise<any> {
        if (!document) {
            throw new Error(`Document not defined`);
        }

        const encoding = this.getFileMimetype(document);
        let pdfResponse: any;
        try {
            pdfResponse = axios.get(document, {
                responseType: 'arraybuffer',
                responseEncoding: 'binary',
                headers: {
                    'Content-Type': encoding,
                },
            });
        } catch (e) {
            throw e;
        }
        console.log(`File obtained successfully ${document}`);
        return pdfResponse;
    }

    /**
     * Gets a public file by url and convert it into a base64 string
     * @param document File to load
     */
    public async getBase64FileAsString(document: string): Promise<any> {
        if (!document) {
            throw new Error(`Document not defined`);
        }

        const encoding = this.getFileMimetype(document);
        let response: any;
        try {
            response = axios.get(document, {
                responseType: 'arraybuffer',
                responseEncoding: 'binary',
                headers: {
                    'Content-Type': encoding,
                },
            });
        } catch (e) {
            throw e;
        }
        console.log(`File obtained successfully ${document}`);
        return Buffer.from(response.data).toString('base64');
    }

    /**
     * Get mimetype based on end of string
     * @param file
     */
    public getFileMimetype(file: string): string {
        if (file.endsWith("pdf")) {
            return 'application/pdf';
        } else if (file.endsWith("png")) {
            return 'image/png';
        }
        return 'application/pdf';
    }

    /**
     * Get mimetype by extension
     * @param extension
     */
    public getMimetype(extension: string): string {
        switch (extension) {
            case 'pdf':
                return 'application/pdf';
            case 'png':
                return 'image/png';
            default:
                return 'application/pdf';
        }
    }
}
