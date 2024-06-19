"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FiltersMangerImpl = void 0;
const BaseMongooseRepositoryImpl_1 = require("../../repository/BaseMongooseRepositoryImpl");
const Filters_1 = require("../../models/Filters");
const common_1 = require("../../common");
class FiltersMangerImpl extends BaseMongooseRepositoryImpl_1.BaseMongooseRepositoryImpl {
    constructor(connection) {
        super((0, common_1.createModel)('filters', Filters_1.CreateFiltersSchema, connection));
    }
}
exports.FiltersMangerImpl = FiltersMangerImpl;
//# sourceMappingURL=FiltersManagerImpl.js.map