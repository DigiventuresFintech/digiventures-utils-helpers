import mongoose, { Connection, Model, Schema } from 'mongoose';
import mongooseLeanGetters from 'mongoose-lean-getters';

export function createModel<T extends mongoose.Document>(
    modelName: string,
    createSchema: (encryption?: any) => Schema,
    connection?: Connection,
): Model<T> {
    if (connection && connection.models[modelName]) {
        return connection.models[modelName] as Model<T>;
    }

    const encryption: any = connection?.get('encryption');
    const schema = createSchema(encryption);
    schema.plugin(mongooseLeanGetters);

    return connection
        ? connection.model<T>(modelName, schema)
        : mongoose.model<T>(modelName, schema);
}
