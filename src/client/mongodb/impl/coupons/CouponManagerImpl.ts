import { BaseMongooseRepositoryImpl } from '../../BaseMongooseRepositoryImpl';
import {createModel, ICoupon} from '../../models/Coupon';
import { ICouponManager } from './ICouponManager';
import {Connection} from "mongoose";

export class CouponManagerImpl
    extends BaseMongooseRepositoryImpl<ICoupon>
    implements ICouponManager
{
    constructor(connection?: Connection) {
        super(
            createModel(connection)
        );
    }
}
