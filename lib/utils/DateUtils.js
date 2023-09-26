"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateUtils = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
class DateUtils {
    static getDateRange(difference) {
        let now = (0, dayjs_1.default)();
        const startDate = now.subtract(difference, 'day').startOf('day');
        const endDate = now.subtract(difference, 'day').endOf('day');
        return {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
        };
    }
}
exports.DateUtils = DateUtils;
