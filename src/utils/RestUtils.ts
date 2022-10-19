import axios from 'axios';

class RestUtils {

    public async getBase64File(document: string, ext: string): Promise<any> {
        if (!document) {
            throw new Error(`Document not defined`);
        }

        const encoding = this.getMimetype(ext);
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
