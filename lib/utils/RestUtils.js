"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestUtils = void 0;
const axios_1 = __importDefault(require("axios"));
class RestUtils {
    async getBase64File(document) {
        if (!document) {
            throw new Error(`Document not defined`);
        }
        const encoding = this.getFileMimetype(document);
        let pdfResponse;
        try {
            pdfResponse = axios_1.default.get(document, {
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
    getFileMimetype(file) {
        if (file.endsWith("pdf")) {
            return 'application/pdf';
        }
        else if (file.endsWith("png")) {
            return 'image/png';
        }
        return 'application/pdf';
    }
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
