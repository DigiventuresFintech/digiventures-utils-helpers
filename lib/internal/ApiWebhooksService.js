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
exports.ApiWebhooksService = void 0;
const axios_1 = __importDefault(require("axios"));
const query_string_1 = __importDefault(require("query-string"));
class ApiWebhooksService {
    constructor() {
        this.API_WEBHOOKS_BASE_URL = process.env.API_WEBHOOKS_BASE_URL;
    }
    getDocumentById(legajoId, authKey) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.API_WEBHOOKS_BASE_URL) {
                throw `api webhooks url not defined`;
            }
            const url = `${this.API_WEBHOOKS_BASE_URL}/1.0/legajo/${legajoId}?authorization=${authKey}`;
            let response;
            try {
                response = yield axios_1.default.get(url);
            }
            catch (error) {
                console.log('Document error: ', error);
                throw new Error('cannot get document');
            }
            return response === null || response === void 0 ? void 0 : response.data;
        });
    }
    updateDocumentById(legajoId, authKey, data, params = {}, notify = 'true') {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.API_WEBHOOKS_BASE_URL) {
                throw `api webhooks url not defined`;
            }
            const queryParams = query_string_1.default.stringify(params);
            const url = `${this.API_WEBHOOKS_BASE_URL}/1.0/legajo/${legajoId}?authorization=${authKey}&${queryParams}`;
            let response = null;
            try {
                response = axios_1.default.put(url, data, { headers: { notify } });
            }
            catch (error) {
                console.log('Error updating document', error);
                throw error;
            }
            return response;
        });
    }
}
exports.ApiWebhooksService = ApiWebhooksService;
