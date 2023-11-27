import { BaseMongooseRepositoryImpl } from '../../BaseMongooseRepositoryImpl';
import { ICoupon } from '../../models/Coupon';
import { ICouponManager } from './ICouponManager';
export declare class CouponManagerImpl extends BaseMongooseRepositoryImpl<ICoupon> implements ICouponManager {
    constructor();
}
