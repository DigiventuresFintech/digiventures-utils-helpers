"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslationsMangerImpl = void 0;
const BaseMongooseRepositoryImpl_1 = require("../../repository/BaseMongooseRepositoryImpl");
const Translation_1 = require("../../models/Translation");
const common_1 = require("../../common");
class TranslationsMangerImpl extends BaseMongooseRepositoryImpl_1.BaseMongooseRepositoryImpl {
    constructor(connection) {
        super((0, common_1.createModel)('translations', Translation_1.CreateTranslationsSchema, connection));
    }
}
exports.TranslationsMangerImpl = TranslationsMangerImpl;
//# sourceMappingURL=TranslationsMangerImpl.js.map