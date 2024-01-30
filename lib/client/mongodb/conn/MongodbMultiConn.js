"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnection = exports.close = exports.connect = exports.instance = exports.MongodbMultiConn = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class MongodbMultiConn {
    constructor() {
        this._connections = {};
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            const closePromises = Object.values(this._connections).map(connection => {
                if (connection) {
                    return connection.close();
                }
            });
            return yield Promise.all(closePromises);
        });
    }
    connect(connections) {
        return __awaiter(this, void 0, void 0, function* () {
            const connectionPromises = Object.entries(connections).map(([key, config]) => __awaiter(this, void 0, void 0, function* () {
                let { string, options, defaultDatabase } = config.mongodb
                    .connection;
                const { encryption } = config.mongodb;
                string = string.replace('${database}', defaultDatabase || 'documents');
                try {
                    const connection = yield mongoose_1.default.createConnection(string, options);
                    connection.set('encryption', encryption);
                    this._connections[key] = connection;
                }
                catch (err) {
                    this._connections[key] = null;
                    console.error('error loading connection', key, err);
                }
                return this._connections[key];
            }));
            return yield Promise.all(connectionPromises);
        });
    }
    get connections() {
        return this._connections;
    }
}
exports.MongodbMultiConn = MongodbMultiConn;
exports.instance = new MongodbMultiConn();
function connect(connections) {
    return __awaiter(this, void 0, void 0, function* () {
        return exports.instance.connect(connections);
    });
}
exports.connect = connect;
function close() {
    return __awaiter(this, void 0, void 0, function* () {
        return exports.instance.close();
    });
}
exports.close = close;
function getConnection(key) {
    return exports.instance.connections[key];
}
exports.getConnection = getConnection;
//# sourceMappingURL=MongodbMultiConn.js.map