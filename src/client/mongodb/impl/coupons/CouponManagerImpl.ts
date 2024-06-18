import { BaseMongooseRepositoryImpl } from '../../repository/BaseMongooseRepositoryImpl';
import { CreateCouponSchema, ICoupon } from '../../models/Coupon';
import { ICouponManager } from './ICouponManager';
import { Connection } from 'mongoose';
import { createModel } from '../../common';

export class CouponManagerImpl
  extends BaseMongooseRepositoryImpl<ICoupon>
  implements ICouponManager
{
  constructor(connection?: Connection) {
    super(createModel('coupons', CreateCouponSchema, connection));
  }
}
