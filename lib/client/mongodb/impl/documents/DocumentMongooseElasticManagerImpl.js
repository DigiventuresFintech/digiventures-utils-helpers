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
exports.DocumentMongooseElasticManagerImpl = void 0;
const BaseMongooseRepositoryImpl_1 = require("../../repository/BaseMongooseRepositoryImpl");
const Document_1 = require("../../models/Document");
const common_1 = require("../../common");
class DocumentMongooseElasticManagerImpl extends BaseMongooseRepositoryImpl_1.BaseMongooseRepositoryImpl {
    constructor(elasticSearchManager, connection) {
        super((0, common_1.createModel)('legajos', encryption => (0, Document_1.CreateDocumentSchema)(encryption), connection));
        this.elasticSearchManager = elasticSearchManager;
        this.needsElasticsearchUpdate = (params) => {
            if (!(params === null || params === void 0 ? void 0 : params.$set))
                return false;
            const { status, typeScoring, totalComplete } = params.$set;
            return Boolean(status || typeScoring || totalComplete);
        };
        this.convertStringToProjection = (projectionString) => {
            const fields = projectionString.split(' ');
            const projection = {};
            fields.forEach(field => {
                projection[field] = 1;
            });
            return projection;
        };
    }
    getById(id, options) {
        const _super = Object.create(null, {
            getById: { get: () => super.getById }
        });
        return __awaiter(this, void 0, void 0, function* () {
            if ((options === null || options === void 0 ? void 0 : options.projection) && typeof options.projection === 'string') {
                const projection = options.projection;
                options = Object.assign(Object.assign({}, options), { projection: this.convertStringToProjection(projection) });
            }
            return yield _super.getById.call(this, id, options);
        });
    }
    findOne(condition, options) {
        const _super = Object.create(null, {
            findOne: { get: () => super.findOne }
        });
        return __awaiter(this, void 0, void 0, function* () {
            if ((options === null || options === void 0 ? void 0 : options.projection) && typeof options.projection === 'string') {
                const projection = options.projection;
                options = Object.assign(Object.assign({}, options), { projection: this.convertStringToProjection(projection) });
            }
            return yield _super.findOne.call(this, condition, options);
        });
    }
    getBy(condition, options) {
        const _super = Object.create(null, {
            getBy: { get: () => super.getBy }
        });
        return __awaiter(this, void 0, void 0, function* () {
            if ((options === null || options === void 0 ? void 0 : options.projection) && typeof options.projection === 'string') {
                const projection = options.projection;
                options = Object.assign(Object.assign({}, options), { projection: this.convertStringToProjection(projection) });
            }
            return _super.getBy.call(this, condition, options);
        });
    }
    findOneAndUpdate(condition, params, options) {
        const _super = Object.create(null, {
            findOneAndUpdate: { get: () => super.findOneAndUpdate }
        });
        return __awaiter(this, void 0, void 0, function* () {
            options = Object.assign(Object.assign({}, options), { new: true });
            if ((options === null || options === void 0 ? void 0 : options.projection) && typeof options.projection === 'string') {
                const projection = options.projection;
                options = Object.assign(Object.assign({}, options), { projection: this.convertStringToProjection(projection) });
            }
            const result = yield _super.findOneAndUpdate.call(this, condition, params, options);
            try {
                if (this.needsElasticsearchUpdate(params) && result._id) {
                    const id = result._id.toString();
                    const { status, typeScoring, totalComplete } = result;
                    const body = { doc: { status, typeScoring, totalComplete } };
                    // Update Elasticsearch
                    yield this.elasticSearchManager.updateById(id, body);
                    console.log('ElasticSearch updated successfully');
                }
            }
            catch (error) {
                console.error(`Error during ElasticSearch update: ${error}`);
            }
            return result;
        });
    }
    updateOne(condition, params, options) {
        const _super = Object.create(null, {
            updateOne: { get: () => super.updateOne }
        });
        return __awaiter(this, void 0, void 0, function* () {
            options = Object.assign(Object.assign({}, options), { new: true });
            if ((options === null || options === void 0 ? void 0 : options.projection) && typeof options.projection === 'string') {
                const projection = options.projection;
                options = Object.assign(Object.assign({}, options), { projection: this.convertStringToProjection(projection) });
            }
            const result = yield _super.updateOne.call(this, condition, params, options);
            try {
                if (this.needsElasticsearchUpdate(params) && result._id) {
                    const id = result._id.toString();
                    const { status, typeScoring, totalComplete } = result;
                    const body = { doc: { status, typeScoring, totalComplete } };
                    // Update Elasticsearch
                    yield this.elasticSearchManager.updateById(id, body);
                    console.log('ElasticSearch updated successfully');
                }
            }
            catch (error) {
                console.error(`Error during ElasticSearch update: ${error}`);
            }
            return result;
        });
    }
}
exports.DocumentMongooseElasticManagerImpl = DocumentMongooseElasticManagerImpl;
//# sourceMappingURL=DocumentMongooseElasticManagerImpl.js.map