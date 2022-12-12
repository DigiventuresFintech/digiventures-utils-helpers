"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestUtils = void 0;
const axios_1 = __importDefault(require("axios"));
const S3Helper_1 = require("../services/s3/S3Helper");
class RestUtils {
    /**
     * Gets public file by url as arraybuffer
     * @param document File to load
     */
    async getBase64File(document) {
        if (!document) {
            throw new Error(`Document not defined`);
        }
        const encoding = this.getFileMimetype(document);
        let pdfResponse;
        try {
            pdfResponse = await axios_1.default.get(document, {
                responseType: 'arraybuffer',
                responseEncoding: 'binary',
                headers: {
                    'Content-Type': encoding,
                },
            });
        }
        catch (e) {
            throw e;
        }
        console.log(`File obtained successfully ${document}`);
        return pdfResponse;
    }
    /**
     * Gets a public file by url and convert it into a base64 string
     * @param document File to load
     */
    async getBase64FileAsString(document) {
        if (!document) {
            throw new Error(`Document not defined`);
        }
        const encoding = this.getFileMimetype(document);
        let response;
        try {
            response = await axios_1.default.get(document, {
                responseType: 'arraybuffer',
                responseEncoding: 'binary',
                headers: {
                    'Content-Type': encoding,
                },
            });
        }
        catch (e) {
            throw e;
        }
        console.log(`File obtained successfully ${document}`);
        return Buffer.from(response.data).toString('base64');
    }
    /**
     * Gets a public file by url and convert it into a base64 string
     * @param document File to load
     */
    async getBase64FileAsStringFromS3(document) {
        if (!document) {
            throw new Error(`Document not defined`);
        }
        const regex = /(https:\/\/s3.amazonaws.com)(\/.*?\/)(.*)/;
        const matchedUrl = document.match(regex);
        if (!matchedUrl) {
            throw new Error('Error match s3 utl');
        }
        const bucketName = matchedUrl[2].replace(/\//g, '');
        const bucketKey = matchedUrl[3];
        console.log('get from bucket and key', bucketName, bucketKey);
        const s3Helper = new S3Helper_1.S3Helper();
        let response;
        try {
            response = await s3Helper.get_s3_file(bucketName, bucketKey);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
        console.log(`File obtained successfully ${document}`);
        return Buffer.from(response).toString('base64');
    }
    /**
     * Get mimetype based on end of string
     * @param file
     */
    getFileMimetype(file) {
        if (file.endsWith('pdf')) {
            return 'application/pdf';
        }
        else if (file.endsWith('png')) {
            return 'image/png';
        }
        return 'application/pdf'; // << rly?
    }
    /**
     * Get mimetype by extension
     * @param extension
     */
    getMimetype(extension) {
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
exports.RestUtils = RestUtils;
