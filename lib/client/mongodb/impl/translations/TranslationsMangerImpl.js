"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslationsMangerImpl = void 0;
const BaseMongooseRepositoryImpl_1 = require("../../repository/BaseMongooseRepositoryImpl");
const Translation_1 = __importDefault(require("../../models/Translation"));
class TranslationsMangerImpl extends BaseMongooseRepositoryImpl_1.BaseMongooseRepositoryImpl {
    constructor() {
        super(Translation_1.default);
    }
}
exports.TranslationsMangerImpl = TranslationsMangerImpl;
//# sourceMappingURL=TranslationsMangerImpl.js.map