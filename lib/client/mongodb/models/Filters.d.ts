import mongoose from 'mongoose';
export interface IFilters extends mongoose.Document {
    product: string;
    identificator: string;
    fields: any;
}
export declare const CreateFiltersSchema: () => mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    product: string;
    identificator: string;
    fields?: any;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    product: string;
    identificator: string;
    fields?: any;
}>> & mongoose.FlatRecord<{
    product: string;
    identificator: string;
    fields?: any;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
