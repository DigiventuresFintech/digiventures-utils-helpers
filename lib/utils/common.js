"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnv = void 0;
function getEnv() {
    const env = process.env.ENVIRONMENT || 'DEV';
    return env.toUpperCase();
}
exports.getEnv = getEnv;
//# sourceMappingURL=common.js.map