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
exports.BaseElasticRepositoryImpl = void 0;
class BaseElasticRepositoryImpl {
    constructor(_client, _indexName) {
        this.client = _client;
        this.indexName = _indexName;
    }
    insertDocument(doc) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.client.index({
                    index: this.indexName,
                    body: doc,
                });
            }
            catch (e) {
                console.error('elasticsearch insert error', e);
                throw e;
            }
        });
    }
    updateById(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.client.update({
                    index: this.indexName,
                    id: id,
                    body,
                });
            }
            catch (e) {
                console.error('elasticsearch update error', e);
                throw e;
            }
        });
    }
    updateByIndex(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.client.index({
                    index: this.indexName,
                    id: id,
                    body,
                });
            }
            catch (e) {
                console.error('elasticsearch index error', e);
                throw e;
            }
        });
    }
    createAlias(aliasName, indexName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.client.indices.putAlias({
                    index: indexName,
                    name: aliasName,
                });
                console.log('alias created successfully', response);
                return response;
            }
            catch (e) {
                console.error('alias created error', e);
                throw e;
            }
        });
    }
    addIndexToAlias(indexName, aliasName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.client.indices.updateAliases({
                    body: {
                        actions: [{ add: { index: indexName, alias: aliasName } }],
                    },
                });
                console.log(`Index '${indexName}' attached to alias '${aliasName}'`, response);
                return response;
            }
            catch (e) {
                console.error('error updating index', e);
                throw e;
            }
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.client.delete({
                    index: this.indexName,
                    id: id,
                });
            }
            catch (e) {
                console.error('elasticsearch delete error', e);
                throw e;
            }
        });
    }
}
exports.BaseElasticRepositoryImpl = BaseElasticRepositoryImpl;
//# sourceMappingURL=BaseElasticRepositoryImpl.js.map