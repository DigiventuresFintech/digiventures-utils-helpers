"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponManagerImpl = void 0;
const BaseMongooseRepositoryImpl_1 = require("../../BaseMongooseRepositoryImpl");
const Coupon_1 = __importDefault(require("../../models/Coupon"));
class CouponManagerImpl extends BaseMongooseRepositoryImpl_1.BaseMongooseRepositoryImpl {
    constructor() {
        super(Coupon_1.default);
    }
}
exports.CouponManagerImpl = CouponManagerImpl;
//# sourceMappingURL=CouponManagerImpl.js.map