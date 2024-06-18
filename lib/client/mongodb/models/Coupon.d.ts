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
export declare const CreateCouponSchema: () => mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    type: Mode;
    createdAt: Date;
    deleted: boolean;
    coupon: string;
    used: boolean;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    type: Mode;
    createdAt: Date;
    deleted: boolean;
    coupon: string;
    used: boolean;
}>> & mongoose.FlatRecord<{
    type: Mode;
    createdAt: Date;
    deleted: boolean;
    coupon: string;
    used: boolean;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
