"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
function handleError(res, err) {
    const statusCode = err.internalCode || 400;
    return res.status(statusCode).json({
        errors: [
            {
                code: err.code,
                error: err.message,
            },
        ],
    });
}
exports.handleError = handleError;
//# sourceMappingURL=common.js.map