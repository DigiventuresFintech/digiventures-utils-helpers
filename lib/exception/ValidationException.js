"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationException = void 0;
class ValidationException extends Error {
    constructor(errorList) {
        super('DTO validation exception');
        this.errors = errorList;
        Object.setPrototypeOf(this, ValidationException.prototype);
    }
    toJSON() {
        return {
            errors: this.errors.map(error => ({ error })),
        };
    }
}
exports.ValidationException = ValidationException;
//# sourceMappingURL=ValidationException.js.map