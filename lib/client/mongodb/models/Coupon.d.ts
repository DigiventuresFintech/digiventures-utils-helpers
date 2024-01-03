import mongoose from 'mongoose';
export declare enum Mode {
    Manual = "manual",
    Auto = "auto"
}
export interface ICoupon extends mongoose.Document {
    coupon: string;
    used: boolean;
    createdAt: Date;
    type?: Mode;
    deleted?: string;
}
declare const _default: mongoose.Model<ICoupon, {}, {}, {}, mongoose.Document<unknown, {}, ICoupon> & ICoupon & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default _default;
