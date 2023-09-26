"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateUtils = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(timezone_1.default);
class DateUtils {
    static getDateRange(difference, timezone) {
        if (timezone) {
            dayjs_1.default.tz.setDefault(timezone); // America/Argentina/Buenos_Aires
        }
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
