import axios from 'axios';

export class RestUtils {

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

    public getFileMimetype(file: string): string {
        if (file.endsWith("pdf")) {
            return 'application/pdf';
        } else if (file.endsWith("png")) {
            return 'image/png';
        }

        return 'application/pdf';
    }

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
