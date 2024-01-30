import mongoose, { Connection, Model, Schema } from 'mongoose';
export declare function createModel<T extends mongoose.Document>(modelName: string, createSchema: (encryption?: any) => Schema, connection?: Connection): Model<T>;
