import mongoose, { Schema } from "mongoose";

export enum Mode {
  Manual = 'manual',
  Auto = 'auto',
}

export interface ICoupon extends mongoose.Document {
  coupon:   string,
  tenantId: mongoose.Types.ObjectId,
  used: boolean,
  createdAt: Date,
  type?: Mode,
  deleted?: string
}

const CouponSchema = new Schema({
  coupon: { type: String, required: true },
  tenantId: { type: mongoose.Types.ObjectId, required: true },
  used: { type: Boolean, required: true },
  createdAt: { type: Date, required: true },
  type: { type: String, enum: Object.values(Mode), default: Mode.Auto },
  deleted: { type: Boolean, default: false }
})

export default mongoose.model<ICoupon>('coupons', CouponSchema);
