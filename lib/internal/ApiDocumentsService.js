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
exports.ApiDocumentsService = void 0;
const JSONUtils_1 = require("../utils/JSONUtils");
const axios_1 = __importDefault(require("axios"));
class ApiDocumentsService {
    constructor() {
        this.API_DOCUMENTS_BASE_URL = process.env.API_DOCUMENTS_BASE_URL;
    }
    update(id, data, prefix, workspace) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.API_DOCUMENTS_BASE_URL) {
                throw `api documents url not defined`;
            }
            const flattenedObject = JSONUtils_1.JSONUtils.flattenObject(data, prefix);
            console.log('Document to update', flattenedObject);
            try {
                const response = yield axios_1.default.put(`${this.API_DOCUMENTS_BASE_URL}/legajo/${id}`, flattenedObject, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        workspace: workspace || '62195d46c8b99af141555eb6',
                    },
                });
                console.log('Updated legajo:', response.data);
                return response === null || response === void 0 ? void 0 : response.data;
            }
            catch (e) {
                console.error('Error update legajo:', e);
                throw e;
            }
        });
    }
}
exports.ApiDocumentsService = ApiDocumentsService;
