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
    getBy(condition, projection) {
        return __awaiter(this, void 0, void 0, function* () {
            let output;
            try {
                output = yield this.model
                    .find(condition, projection || {})
                    .lean();
            }
            catch (e) {
                console.error('mongoose getBy error', e);
            }
            return output;
        });
    }
    updateMany(condition, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const output = yield this.model.updateMany(condition, params);
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
}
exports.BaseMongooseRepositoryImpl = BaseMongooseRepositoryImpl;
