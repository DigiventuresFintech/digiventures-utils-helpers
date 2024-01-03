import mongoose from 'mongoose';
export interface IFilters extends mongoose.Document {
    product: string;
    identificator: string;
    fields: any;
}
declare const _default: mongoose.Model<IFilters, {}, {}, {}, mongoose.Document<unknown, {}, IFilters> & IFilters & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default _default;
