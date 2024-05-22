import mongoose, { Schema } from 'mongoose';

export interface ITranslations extends mongoose.Document {
  product: string;
  referenceId: string;
  language: string;
  translations: any;
  languageInformation: string;
}

const TranslationsSchema = new Schema({
  product: { type: String, required: true },
  referenceId: { type: String, required: true },
  language: { type: String, required: true },
  languageInformation: { type: String, required: true },
  translations: Schema.Types.Mixed,
});

export default mongoose.model<ITranslations>(
  'translations',
  TranslationsSchema,
);
