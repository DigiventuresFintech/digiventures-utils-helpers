"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentManagerImpl = void 0;
const BaseMongooseRepositoryImpl_1 = require("../../BaseMongooseRepositoryImpl");
const Document_1 = require("../../models/Document");
class DocumentManagerImpl extends BaseMongooseRepositoryImpl_1.BaseMongooseRepositoryImpl {
    constructor() {
        super((0, Document_1.createModel)());
    }
}
exports.DocumentManagerImpl = DocumentManagerImpl;
//# sourceMappingURL=DocumentManagerImpl.js.map