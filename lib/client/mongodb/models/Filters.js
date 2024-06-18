"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFiltersSchema = void 0;
const mongoose_1 = require("mongoose");
const CreateFiltersSchema = () => {
    return new mongoose_1.Schema({
        product: { type: String, required: true },
        identificator: { type: String, required: true },
        fields: mongoose_1.Schema.Types.Mixed,
    });
};
exports.CreateFiltersSchema = CreateFiltersSchema;
//# sourceMappingURL=Filters.js.map