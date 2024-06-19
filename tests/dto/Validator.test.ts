import {
  AbstractValidator,
  ValidationMap,
  ValidationRequiredFields,
} from '../../src';

class ValidatorTest1 extends AbstractValidator {
  private readonly propertyA: string;
  private readonly propertyB?: number;

  constructor(propertyA: string, propertyB?: number) {
    super();
    this.propertyA = propertyA;
    this.propertyB = propertyB;
  }

  getFieldsValidation(): ValidationMap | null {
    return new Map([
      [
        () => {
          return this.propertyA.length > 2;
        },
        'Property A is too large',
      ],
      [
        () => {
          return this.propertyB === 0;
        },
        'Property is zero',
      ],
    ]);
  }

  getRequiredFields(): ValidationRequiredFields | null {
    return {
      propertyA: () => this.propertyA,
      propertyB: () => this.propertyB,
    };
  }
}

describe(__filename, () => {
  test('should pass validation when variables are ok in DTO', () => {
    const validator = new ValidatorTest1('a', 1);

    expect(() => {
      validator.validate();
    }).not.toThrow();
  });

  test('should pass validation when one property doesnt match', () => {
    const validator = new ValidatorTest1('juan', 1);

    expect(() => {
      validator.validate();
    }).toThrow(/DTO validation exception/);
  });

  test('should pass validation when one property is null', () => {
    const validator = new ValidatorTest1('juan');

    expect(() => {
      validator.validate();
    }).toThrow(/DTO validation exception/);
  });
});
