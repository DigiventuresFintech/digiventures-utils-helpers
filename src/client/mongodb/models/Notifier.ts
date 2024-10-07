import { Schema, Document } from 'mongoose';

export interface INotifier extends Document {
  type: string;
  parameters: any;
}

export const CreateNotifierSchema = () => {
  return new Schema(
    {
      type: { type: String, required: true },
      parameters: { type: Map, of: String, required: true },
    },
    { collection: 'notifiers' },
  );
};
