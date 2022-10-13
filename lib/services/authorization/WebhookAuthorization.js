"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookAuthorization = void 0;
const axios_1 = __importDefault(require("axios"));
class WebhookAuthorization {
    constructor() {
        this.authUrl = {
            prod: '',
            dev: '',
            local: '',
        };
    }
    /**
     * Authentication method
     * @param input Api gateway request header
     */
    async authenticate(input) {
        return await this.login(input);
    }
    /**
     * Method used that authenticates a request using application and secrets
     * through api tenants
     * @param input Api gateway request header
     * @private
     */
    async login(input) {
        const env = process.env.ENVIRONMENT;
        if (!env) {
            throw new Error('environment not defined');
        }
        const baseUrl = this.authUrl[env.toLowerCase()] || this.authUrl.local;
        const url = `${baseUrl.trim()}/authorization/${input.applicationId}/${input.secret}`;
        let response = null;
        try {
            response = await axios_1.default.get(url);
        }
        catch (e) {
            console.error(e);
            throw new Error(`authorization error`);
        }
        if (response && response.status == 200 && response.data.authorization) {
            return response.data.authorization;
        }
        throw new Error(`authorization service response an unknown error`);
    }
}
exports.WebhookAuthorization = WebhookAuthorization;
