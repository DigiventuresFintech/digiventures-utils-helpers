import { BaseMongooseRepositoryImpl } from '../../BaseMongooseRepositoryImpl';
import DocumentModel, { ICoupon } from '../../models/Coupon';
import { ICouponManager } from './ICouponManager';

export class CouponManagerImpl
    extends BaseMongooseRepositoryImpl<ICoupon>
    implements ICouponManager
{
    constructor() {
        super(DocumentModel);
    }
}
