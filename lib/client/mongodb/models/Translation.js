"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTranslationsSchema = void 0;
const mongoose_1 = require("mongoose");
const CreateTranslationsSchema = () => {
    return new mongoose_1.Schema({
        product: { type: String, required: true },
        referenceId: { type: String, required: true },
        language: { type: String, required: true },
        languageInformation: { type: String, required: true },
        translations: mongoose_1.Schema.Types.Mixed,
    });
};
exports.CreateTranslationsSchema = CreateTranslationsSchema;
//# sourceMappingURL=Translation.js.map