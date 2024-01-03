import mongoose from 'mongoose';
export interface ITranslations extends mongoose.Document {
    product: string;
    referenceId: string;
    language: string;
    translations: any;
}
declare const _default: mongoose.Model<ITranslations, {}, {}, {}, mongoose.Document<unknown, {}, ITranslations> & ITranslations & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default _default;
