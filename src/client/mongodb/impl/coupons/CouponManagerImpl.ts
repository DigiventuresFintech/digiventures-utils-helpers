import { BaseMongooseRepositoryImpl } from '../../repository/BaseMongooseRepositoryImpl';
import { CreateCouponSchema, ICoupon } from '../../models/Coupon';
import { ICouponManager } from './ICouponManager';
import { Connection } from 'mongoose';
import { CreateModel } from '../../common';

export class CouponManagerImpl
  extends BaseMongooseRepositoryImpl<ICoupon>
  implements ICouponManager
{
  constructor(connection?: Connection) {
    super(CreateModel('coupons', CreateCouponSchema, connection));
  }
}
