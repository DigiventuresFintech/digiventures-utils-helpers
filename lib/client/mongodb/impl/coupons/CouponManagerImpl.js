"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponManagerImpl = void 0;
const BaseMongooseRepositoryImpl_1 = require("../../repository/BaseMongooseRepositoryImpl");
const Coupon_1 = require("../../models/Coupon");
const common_1 = require("../../common");
class CouponManagerImpl extends BaseMongooseRepositoryImpl_1.BaseMongooseRepositoryImpl {
    constructor(connection) {
        super((0, common_1.createModel)('coupons', Coupon_1.CreateCouponSchema, connection));
    }
}
exports.CouponManagerImpl = CouponManagerImpl;
//# sourceMappingURL=CouponManagerImpl.js.map