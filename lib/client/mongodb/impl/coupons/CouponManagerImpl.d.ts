import { BaseMongooseRepositoryImpl } from '../../BaseMongooseRepositoryImpl';
import { ICoupon } from '../../models/Coupon';
import { ICouponManager } from './ICouponManager';
import { Connection } from "mongoose";
export declare class CouponManagerImpl extends BaseMongooseRepositoryImpl<ICoupon> implements ICouponManager {
    constructor(connection?: Connection);
}
