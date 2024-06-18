"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCouponSchema = exports.Mode = void 0;
const mongoose_1 = require("mongoose");
var Mode;
(function (Mode) {
    Mode["Manual"] = "manual";
    Mode["Auto"] = "auto";
})(Mode || (exports.Mode = Mode = {}));
const CreateCouponSchema = () => {
    return new mongoose_1.Schema({
        coupon: { type: String, required: true },
        //tenantId: { type: mongoose.Types.ObjectId, required: true },
        used: { type: Boolean, required: true },
        createdAt: { type: Date, required: true },
        type: { type: String, enum: Object.values(Mode), default: Mode.Auto },
        deleted: { type: Boolean, default: false },
    });
};
exports.CreateCouponSchema = CreateCouponSchema;
//# sourceMappingURL=Coupon.js.map