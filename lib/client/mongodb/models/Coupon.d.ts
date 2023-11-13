import mongoose from 'mongoose';
export declare enum Mode {
    Manual = "manual",
    Auto = "auto"
}
export interface ICoupon extends mongoose.Document {
    coupon: string;
    tenantId: mongoose.Types.ObjectId;
    used: boolean;
    createdAt: Date;
    type?: Mode;
    deleted?: string;
}
declare const _default: mongoose.Model<ICoupon, {}, {}, {}, any>;
export default _default;
