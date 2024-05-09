import mongoose, { Connection, Model } from 'mongoose';
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
declare function createModel(connection?: Connection): Model<ICoupon>;
export { createModel };
