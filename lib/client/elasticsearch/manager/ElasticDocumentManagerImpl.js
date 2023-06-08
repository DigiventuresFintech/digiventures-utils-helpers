"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElasticDocumentManagerImpl = void 0;
const BaseElasticRepositoryImpl_1 = require("../repository/BaseElasticRepositoryImpl");
class ElasticDocumentManagerImpl extends BaseElasticRepositoryImpl_1.BaseElasticRepositoryImpl {
    constructor(client) {
        super(client, 'default_legajos');
    }
    update(id, body) {
        if (!body['updatedAt']) {
            body['updatedAt'] = new Date().toISOString();
        }
        return this.updateById(id, {
            doc: body
        });
    }
    index(id, body) {
        if (!body['updatedAt']) {
            body['updatedAt'] = new Date().toISOString();
        }
        return this.updateByIndex(id, {
            doc: body
        });
    }
}
exports.ElasticDocumentManagerImpl = ElasticDocumentManagerImpl;
