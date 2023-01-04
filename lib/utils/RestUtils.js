"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    getBase64File(document) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!document) {
                throw new Error(`Document not defined`);
            }
            const encoding = this.getFileMimetype(document);
            let pdfResponse;
            try {
                pdfResponse = yield axios_1.default.get(document, {
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
        });
    }
    /**
     * Gets a public file by url and convert it into a base64 string
     * @param document File to load
     */
    getBase64FileAsString(document) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!document) {
                throw new Error(`Document not defined`);
            }
            const encoding = this.getFileMimetype(document);
            let response;
            try {
                response = yield axios_1.default.get(document, {
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
        });
    }
    /**
     * Gets a public file by url and convert it into a base64 string
     * @param document File to load
     */
    getBase64FileAsStringFromS3(document) {
        return __awaiter(this, void 0, void 0, function* () {
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
                response = yield s3Helper.get_s3_file(bucketName, bucketKey);
            }
            catch (e) {
                console.error(e);
                throw e;
            }
            console.log(`File obtained successfully ${document}`);
            return Buffer.from(response).toString('base64');
        });
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
