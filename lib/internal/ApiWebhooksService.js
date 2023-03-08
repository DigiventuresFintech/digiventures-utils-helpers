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
const JSONUtils_1 = require("../utils/JSONUtils");
class ApiWebhooksService {
    constructor() {
        this.API_WEBHOOKS_BASE_URL = process.env.API_WEBHOOKS_BASE_URL;
    }
    createDocument(data, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.API_WEBHOOKS_BASE_URL) {
                throw `api webhooks url not defined`;
            }
            options = Object.assign(options, {
                'Content-Type': 'application/json',
                workspace: (options === null || options === void 0 ? void 0 : options.workspace) || '62195d46c8b99af141555eb6',
            });
            const url = `${this.API_WEBHOOKS_BASE_URL}/1.0/legajo/`;
            let response = null;
            try {
                response = yield axios_1.default.post(url, data, {
                    headers: Object.assign({}, options)
                });
            }
            catch (error) {
                console.log('Error creating document', error);
                throw error;
            }
            return response === null || response === void 0 ? void 0 : response.data;
        });
    }
    getDocumentById(legajoId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.API_WEBHOOKS_BASE_URL) {
                throw `api webhooks url not defined`;
            }
            options = Object.assign(options, {
                'Content-Type': 'application/json',
                workspace: (options === null || options === void 0 ? void 0 : options.workspace) || '62195d46c8b99af141555eb6',
            });
            const url = `${this.API_WEBHOOKS_BASE_URL}/1.0/legajo/${legajoId}`;
            let response;
            try {
                response = yield axios_1.default.get(url, {
                    headers: Object.assign({}, options)
                });
            }
            catch (error) {
                console.log('Document error: ', error);
                throw new Error('cannot get document');
            }
            return response === null || response === void 0 ? void 0 : response.data;
        });
    }
    updateDocumentById(legajoId, data, prefix, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.API_WEBHOOKS_BASE_URL) {
                throw `api webhooks url not defined`;
            }
            options = Object.assign(options, {
                'Content-Type': 'application/json',
                workspace: (options === null || options === void 0 ? void 0 : options.workspace) || '62195d46c8b99af141555eb6',
            });
            const flattenedObject = JSONUtils_1.JSONUtils.flattenObject(data, prefix);
            console.log('Document to update', flattenedObject);
            const url = `${this.API_WEBHOOKS_BASE_URL}/1.0/legajo/${legajoId}`;
            let response = null;
            try {
                response = yield axios_1.default.put(url, flattenedObject, {
                    headers: Object.assign({}, options)
                });
            }
            catch (error) {
                console.log('Error updating document', error);
                throw error;
            }
            return response === null || response === void 0 ? void 0 : response.data;
        });
    }
}
exports.ApiWebhooksService = ApiWebhooksService;
