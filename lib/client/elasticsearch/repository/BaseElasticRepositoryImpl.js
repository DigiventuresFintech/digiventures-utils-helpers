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
    updateById(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.client.update({
                    index: this.indexName,
                    id: id,
                    body: {
                        doc: body
                    }
                });
                console.log('result', result);
            }
            catch (e) {
                console.error('elasticsearch update error', e);
                throw e;
            }
            return Promise.resolve(undefined);
        });
    }
}
exports.BaseElasticRepositoryImpl = BaseElasticRepositoryImpl;
