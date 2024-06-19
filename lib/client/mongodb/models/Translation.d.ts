import mongoose from 'mongoose';
export interface ITranslations extends mongoose.Document {
    product: string;
    referenceId: string;
    language: string;
    translations: any;
    languageInformation: string;
}
export declare const CreateTranslationsSchema: () => mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    product: string;
    language: string;
    referenceId: string;
    languageInformation: string;
    translations?: any;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    product: string;
    language: string;
    referenceId: string;
    languageInformation: string;
    translations?: any;
}>> & mongoose.FlatRecord<{
    product: string;
    language: string;
    referenceId: string;
    languageInformation: string;
    translations?: any;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
