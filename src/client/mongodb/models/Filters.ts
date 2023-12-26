import mongoose, { Schema } from 'mongoose';

export interface IFilters extends mongoose.Document {
    product: string;
    identificator: string;
    fields: any;
}

const FiltersSchema = new Schema({
    product: { type: String, required: true },
    identificator: { type: String, required: true },
    fields: Schema.Types.Mixed,
});

export default mongoose.model<IFilters>(
    'filters',
    FiltersSchema,
);
