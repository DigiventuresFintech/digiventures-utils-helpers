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
exports.ApiTenantService = void 0;
const axios_1 = __importDefault(require("axios"));
class ApiTenantService {
    constructor() {
        this.API_TENANTS_BASE_URL = process.env.API_TENANTS_BASE_URL;
    }
    /**
     * Get tenant by id
     * @param id Tenant id
     * @param path Paths to get comma separated
     */
    getById(id, path) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.API_TENANTS_BASE_URL) {
                throw `api tenants url not defined`;
            }
            const queryParams = path ? `?select=${path}` : '';
            const url = `${this.API_TENANTS_BASE_URL}/tenant/${id}${queryParams}`;
            let response;
            try {
                response = yield axios_1.default.get(url);
            }
            catch (error) {
                console.log('Error getting tenant: ', error);
                throw new Error('tenant cannot be obtained');
            }
            return response === null || response === void 0 ? void 0 : response.data;
        });
    }
}
exports.ApiTenantService = ApiTenantService;
