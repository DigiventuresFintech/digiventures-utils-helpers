"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FiltersMangerImpl = void 0;
const BaseMongooseRepositoryImpl_1 = require("../../repository/BaseMongooseRepositoryImpl");
const Filters_1 = __importDefault(require("../../models/Filters"));
class FiltersMangerImpl extends BaseMongooseRepositoryImpl_1.BaseMongooseRepositoryImpl {
    constructor() {
        super(Filters_1.default);
    }
}
exports.FiltersMangerImpl = FiltersMangerImpl;
//# sourceMappingURL=FiltersManagerImpl.js.map