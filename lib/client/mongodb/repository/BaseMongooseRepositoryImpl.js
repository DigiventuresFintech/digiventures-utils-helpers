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
exports.BaseMongooseRepositoryImpl = void 0;
class BaseMongooseRepositoryImpl {
    constructor(repository, populate = []) {
        this.model = repository;
        this.populate = populate;
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = yield this.model
                .findOne({ _id: id })
                .populate(this.populate)
                .lean();
            if (!entity) {
                throw new Error('entity not found');
            }
            return entity;
        });
    }
    findOne(condition, projection) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = yield this.model
                .findOne(condition, projection || {})
                .populate(this.populate)
                .lean();
            if (!entity) {
                throw new Error('entity not found');
            }
            return entity;
        });
    }
    getBy(condition, projection) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entity = yield this.model
                    .find(condition, projection || {})
                    .lean({ getters: true });
                if (!entity) {
                    throw new Error('entity not found');
                }
                return entity;
            }
            catch (e) {
                throw e;
            }
        });
    }
    updateMany(condition, params, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const output = yield this.model.updateMany(condition, params, options || null);
            if (!output) {
                throw new Error('entities not found');
            }
            return output;
        });
    }
    updateOne(condition, params, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const output = yield this.model.updateOne(condition, params, options || null);
            if (!output) {
                throw new Error('entities not found');
            }
            return output;
        });
    }
    findOneAndUpdate(condition, params, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const output = yield this.model.findOneAndUpdate(condition, params, options || null);
            if (!output) {
                throw new Error('entities not found');
            }
            return output;
        });
    }
    insertMany(documents) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.model.insertMany(documents);
                return result;
            }
            catch (error) {
                throw new Error('Error inserting documents');
            }
        });
    }
    deleteMany(conditions) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.model.deleteMany(conditions).lean();
                return result;
            }
            catch (error) {
                throw new Error('Error deleting documents');
            }
        });
    }
}
exports.BaseMongooseRepositoryImpl = BaseMongooseRepositoryImpl;
//# sourceMappingURL=BaseMongooseRepositoryImpl.js.map