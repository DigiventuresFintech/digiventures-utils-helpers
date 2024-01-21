"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentIndexManagerImpl = void 0;
const BaseMongooseRepositoryImpl_1 = require("../../BaseMongooseRepositoryImpl");
const mongoose_1 = __importStar(require("mongoose"));
const common_1 = require("../../common");
class DocumentIndexManagerImpl extends BaseMongooseRepositoryImpl_1.BaseMongooseRepositoryImpl {
    constructor(connection) {
        super((0, common_1.createModel)('documents_index', () => {
            return new mongoose_1.Schema({
                metadata: {
                    type: mongoose_1.default.Schema.Types.String,
                    required: true,
                },
                tenantId: {
                    type: mongoose_1.default.Schema.Types.ObjectId,
                    required: true,
                },
                workspaceId: {
                    type: mongoose_1.default.Schema.Types.ObjectId,
                    required: true,
                },
                documentId: {
                    type: mongoose_1.default.Schema.Types.ObjectId,
                    required: true,
                },
                createdAt: Date,
                updatedAt: Date,
            }, {
                timestamps: true,
            });
        }, connection));
    }
}
exports.DocumentIndexManagerImpl = DocumentIndexManagerImpl;
//# sourceMappingURL=DocumentIndexManagerImpl.js.map