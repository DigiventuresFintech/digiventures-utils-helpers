"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = void 0;
/**
 * Class for manage unauthorized error
 */
class UnauthorizedError extends Error {
    constructor() {
        super();
        this.message = 'Unauthorized';
    }
    /**
     * Error trace property (string).
     */
    get trace() {
        return this.message;
    }
}
exports.UnauthorizedError = UnauthorizedError;
