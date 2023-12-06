import mongoose from 'mongoose';
export interface ITranslations extends mongoose.Document {
    product: string;
    referenceId: string;
    language: string;
    translations: any;
}
declare const _default: mongoose.Model<ITranslations, {}, {}, {}, any>;
export default _default;
