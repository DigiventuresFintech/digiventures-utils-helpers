"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentManagerImpl = void 0;
const BaseMongooseRepositoryImpl_1 = require("../../BaseMongooseRepositoryImpl");
const Document_1 = __importDefault(require("../../models/Document"));
class DocumentManagerImpl extends BaseMongooseRepositoryImpl_1.BaseMongooseRepositoryImpl {
    constructor() {
        super(Document_1.default);
    }
}
exports.DocumentManagerImpl = DocumentManagerImpl;
//# sourceMappingURL=DocumentManagerImpl.js.map