export declare class ValidationException extends Error {
    errors: string[];
    constructor(errorList: string[]);
    toJSON(): {
        errors: {
            error: string;
        }[];
    };
}
