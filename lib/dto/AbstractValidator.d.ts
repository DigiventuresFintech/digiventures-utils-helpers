export type ValidationFunction = () => boolean;
export type ValidationMap = Map<ValidationFunction, string>;
export interface ValidationRequiredFields {
    [key: string]: () => any;
}
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
export declare abstract class AbstractValidator {
    private readonly validations;
    protected constructor();
    validate(): void;
    private validateFields;
    private validateRequiredFields;
    abstract getRequiredFields(): ValidationRequiredFields | null;
    abstract getFieldsValidation(): ValidationMap | null;
}
