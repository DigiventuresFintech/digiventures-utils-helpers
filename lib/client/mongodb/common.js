"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_lean_getters_1 = __importDefault(require("mongoose-lean-getters"));
function createModel(modelName, createSchema, connection) {
    if (mongoose_1.default.models[modelName]) {
        return mongoose_1.default.models[modelName];
    }
    if (connection && connection.models[modelName]) {
        return connection.models[modelName];
    }
    const encryption = connection === null || connection === void 0 ? void 0 : connection.get('encryption');
    const schema = createSchema(encryption);
    schema.plugin(mongoose_lean_getters_1.default);
    return connection
        ? connection.model(modelName, schema)
        : mongoose_1.default.model(modelName, schema);
}
exports.createModel = createModel;
//# sourceMappingURL=common.js.map