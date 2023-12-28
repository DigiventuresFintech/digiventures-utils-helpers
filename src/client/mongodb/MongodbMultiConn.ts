import {IBaseClientConnection} from "../IBaseClientConnection";
import mongoose, {Connection} from "mongoose";

export class MongodbMultiConn implements IBaseClientConnection {

    private readonly _connections: Record<string, Connection|null>;

    constructor() {
        this._connections = {}
    }

    async close(): Promise<any> {
        const closePromises = Object.values(this._connections).map(connection => {
            if (connection) {
                return connection.close();
            }
        });

        return await Promise.all(closePromises);
    }

    async connect(connections?: any): Promise<any> {
        const connectionPromises: Promise<any>[] = Object.entries(connections).map(async ([key, config]) => {
            const { string, options } = (config as any).mongodb.connection;

            try {
                this._connections[key] = await mongoose.createConnection(string, options as {})
            } catch (err) {
                this._connections[key] = null
                console.error('error loading connection', key, err);
            }

            return this._connections[key]
        });

        return await Promise.all(connectionPromises)
    }


    get connections(): Record<string, any> {
        return this._connections;
    }
}

export const instance = new MongodbMultiConn()
export async function connect(connections?: any) {
    return instance.connect(connections);
}
export async function close() {
    return instance.close();
}
export function getConnection(key: string) {
    return instance.connections[key];
}
