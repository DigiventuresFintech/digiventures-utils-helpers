"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractValidator = void 0;
const lodash_1 = require("lodash");
const ValidationException_1 = require("../exception/ValidationException");
/**
 * AbstractValidator is a base class for implementing custom validators, representing a DTO.
 *
 * This abstract class provides a framework for defining and running validation rules
 * on a set of fields and required fields. Subclasses must implement the abstract methods
 * `getRequiredFields` and `getFieldsValidation` to specify the validation logic.
 *
 * Example usage:
 * ```js
 * class ValidatorTest1 extends AbstractValidator {
 *     private readonly propertyA: string;
 *     private readonly propertyB: number;
 *
 *     constructor(propertyA: string, propertyB: number) {
 *         super();
 *         this.propertyA = propertyA;
 *         this.propertyB = propertyB;
 *     }
 *
 *     getFieldsValidation(): ValidationMap | null {
 *         return new Map([
 *             [
 *                 () => {
 *                     return this.propertyA.length > 2;
 *                 },
 *                 'Property A is too large',
 *             ],
 *             [
 *                 () => {
 *                     return this.propertyB === 0;
 *                 },
 *                 'Property is zero',
 *             ],
 *         ]);
 *     }
 *
 *     getRequiredFields(): ValidationRequiredFields | null {
 *         return {
 *             propertyA: () => this.propertyA,
 *             propertyB: () => this.propertyB,
 *         };
 *     }
 * }
 *
 * const validator = new MyValidator();
 * try {
 *   validator.validate();
 *   console.log('Validation successful');
 * } catch (error) {
 *   console.error('Validation failed:', error);
 * }
 * ```
 */
class AbstractValidator {
    constructor() {
        this.validations = new Map();
    }
    validate() {
        const resultValidateRequiredFields = this.validateRequiredFields();
        const resultValidateFields = this.validateFields();
        const finalResult = (0, lodash_1.merge)(resultValidateFields, resultValidateRequiredFields);
        if (finalResult.length > 0) {
            throw new ValidationException_1.ValidationException(finalResult);
        }
    }
    validateFields() {
        const results = [];
        if (this.getFieldsValidation() != null) {
            for (const [validationFunction, errorMessage,] of this.getFieldsValidation()) {
                try {
                    if (validationFunction()) {
                        results.push(errorMessage);
                    }
                }
                catch (_) {
                    results.push(errorMessage);
                }
            }
        }
        return results;
    }
    validateRequiredFields() {
        const results = [];
        if (this.getRequiredFields() !== null) {
            for (const key in this.getRequiredFields()) {
                if (Object.prototype.hasOwnProperty.call(this.getRequiredFields(), key)) {
                    try {
                        const getAddressFunction = this.getRequiredFields()[key];
                        const addressValue = getAddressFunction();
                        if (addressValue === undefined ||
                            typeof addressValue === 'undefined' ||
                            addressValue === null ||
                            addressValue === 'null') {
                            results.push(`${key} is missing`);
                        }
                    }
                    catch (_) {
                        results.push(`${key} is missing`);
                    }
                }
            }
        }
        return results;
    }
}
exports.AbstractValidator = AbstractValidator;
//# sourceMappingURL=AbstractValidator.js.map