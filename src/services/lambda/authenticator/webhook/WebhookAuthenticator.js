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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookAuthenticator = void 0;
const axios_1 = require("axios");
class WebhookAuthenticator {
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
    authenticate(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.login(input);
        });
    }
    /**
     * Method used that authenticates a request using application and secrets
     * through api tenants
     * @param input Api gateway request header
     * @private
     */
    login(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const env = process.env.ENVIRONMENT;
            if (!env) {
                throw new Error('environment not defined');
            }
            if (!input.hasOwnProperty('applicationId') ||
                !input.hasOwnProperty('secret')) {
                throw new Error('authentication headers not defined');
            }
            const baseUrl = this.authUrl[env.toLowerCase()] || this.authUrl.local;
            const url = `${baseUrl.trim()}/authorization/${input['applicationId']}/${input['secret']}`;
            let response = null;
            try {
                response = yield axios_1.default.get(url);
            }
            catch (e) {
                console.error(e);
                throw new Error(`authorization error`);
            }
            if (response && response.status == 200 && response.data.authorization) {
                return response.data.authorization;
            }
            throw new Error(`authorization service response an unknown error`);
        });
    }
}
exports.WebhookAuthenticator = WebhookAuthenticator;
//# sourceMappingURL=WebhookAuthenticator.js.map