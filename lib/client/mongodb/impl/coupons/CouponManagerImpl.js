"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponManagerImpl = void 0;
const BaseMongooseRepositoryImpl_1 = require("../../BaseMongooseRepositoryImpl");
const Coupon_1 = require("../../models/Coupon");
class CouponManagerImpl extends BaseMongooseRepositoryImpl_1.BaseMongooseRepositoryImpl {
    constructor(connection) {
        super((0, Coupon_1.createModel)(connection));
    }
}
exports.CouponManagerImpl = CouponManagerImpl;
//# sourceMappingURL=CouponManagerImpl.js.map