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
exports.BaseAppServiceRepositoryImpl = void 0;
const axios_1 = __importDefault(require("axios"));
class BaseAppServiceRepositoryImpl {
    constructor(collection, options) {
        this.DEFAULT_MONGO_APP_SERVICE_BASE_PATH = 'https://us-east-1.aws.data.mongodb-api.com/app/onboarding-flows-app-qa-gtann/endpoint/data/v1';
        this.collection = collection;
        this.options = options;
    }
    findOne(condition, projection) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.getBasePath()}/action/findOne`;
            const data = Object.assign({}, this.getData(), { filter: condition });
            try {
                const res = yield axios_1.default.post(url, data, {
                    headers: {
                        apiKey: this.getAppId(),
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                });
                const entity = (_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.document;
                if (!entity) {
                    throw new Error('Entity not found');
                }
                return entity;
            }
            catch (e) {
                console.error('findOne error', e);
                throw e;
            }
        });
    }
    findOneAndUpdate(condition, params, options) {
        return __awaiter(this, void 0, void 0, function* () {
            //  TODO: Not implemented in app service
            return Promise.resolve({});
        });
    }
    getBy(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.getBasePath()}/action/find`;
            const data = Object.assign({}, this.getData(), { filter: condition });
            try {
                const res = yield axios_1.default.post(url, data, {
                    headers: {
                        apiKey: this.getAppId(),
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                });
                return res === null || res === void 0 ? void 0 : res.data;
            }
            catch (e) {
                console.error('getBy error', e);
                throw e;
            }
        });
    }
    getById(id) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.getBasePath()}/action/findOne`;
            const data = Object.assign({}, this.getData(), {
                filter: {
                    _id: { $oid: id },
                },
            });
            try {
                const headers = {
                    apiKey: this.getAppId(),
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                };
                const res = yield axios_1.default.post(url, data, { headers });
                const entity = (_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.document;
                if (!entity) {
                    throw new Error('Entity not found');
                }
                return entity;
            }
            catch (error) {
                console.error('getById error', error);
                throw error;
            }
        });
    }
    updateMany(condition, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.getBasePath()}/action/updateMany`;
            const data = Object.assign({}, this.getData(), {
                filter: condition,
                update: params,
            });
            try {
                const res = yield axios_1.default.post(url, data, {
                    headers: {
                        apiKey: this.getAppId(),
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                });
                return res === null || res === void 0 ? void 0 : res.data;
            }
            catch (e) {
                console.error('updateMany error', e);
                throw e;
            }
        });
    }
    updateOne(condition, params, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.getBasePath()}/action/updateOne`;
            const data = Object.assign({}, this.getData(), {
                filter: condition,
                update: params,
            });
            try {
                const res = yield axios_1.default.post(url, data, {
                    headers: {
                        apiKey: this.getAppId(),
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                });
                return res === null || res === void 0 ? void 0 : res.data;
            }
            catch (e) {
                console.error('updateMany error', e);
                throw e;
            }
        });
    }
    getData() {
        var _a, _b;
        return {
            collection: this.collection,
            dataSource: ((_a = this.options) === null || _a === void 0 ? void 0 : _a.dataSource) ||
                process.env.MONGO_APP_SERVICE_DEFAULT_DATASOURCE ||
                'mongodb-atlas',
            database: ((_b = this.options) === null || _b === void 0 ? void 0 : _b.database) ||
                process.env.MONGO_APP_SERVICE_DEFAULT_DATABASE ||
                'mongodb-atlas',
        };
    }
    getAppId() {
        var _a;
        return (((_a = this.options) === null || _a === void 0 ? void 0 : _a.apiKey) ||
            process.env.MONGO_APP_SERVICE_API_KEY);
    }
    getBasePath() {
        var _a;
        return (((_a = this.options) === null || _a === void 0 ? void 0 : _a.basePath) ||
            process.env.MONGO_APP_SERVICE_BASE_PATH ||
            this.DEFAULT_MONGO_APP_SERVICE_BASE_PATH);
    }
    insertMany(documents) {
        return __awaiter(this, void 0, void 0, function* () {
            //  TODO: Not implemented in app service
            return Promise.resolve({});
        });
    }
    deleteMany(conditions) {
        return __awaiter(this, void 0, void 0, function* () {
            //  TODO: Not implemented in app service
            return Promise.resolve({});
        });
    }
}
exports.BaseAppServiceRepositoryImpl = BaseAppServiceRepositoryImpl;
//# sourceMappingURL=BaseAppServiceRepositoryImpl.js.map