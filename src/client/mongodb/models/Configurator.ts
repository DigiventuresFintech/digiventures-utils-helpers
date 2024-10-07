import { Schema, Document } from 'mongoose';

export interface IConfigurator extends Document {
  type: string;
  mappings: Map<string, string>;
  options: Map<string, string>;
  excludeAttributes: Map<string, number>;
  enable: boolean;
  reference: string;
  referencesIds: Map<string, any>;
}

export const CreateConfiguratorSchema = () => {
  return new Schema(
    {
      _id: { type: Schema.Types.ObjectId, required: true },
      type: { type: String, required: true },
      mappings: { type: Map, of: String, required: true },
      options: { type: Map, of: String, required: true },
      excludeAttributes: { type: Map, of: Number, required: true },
      enable: { type: Boolean, required: true },
      reference: { type: String, required: true },
      referencesIds: { type: Map, of: Schema.Types.Mixed, required: true },
    },
    { collection: 'configurators' },
  );
};
