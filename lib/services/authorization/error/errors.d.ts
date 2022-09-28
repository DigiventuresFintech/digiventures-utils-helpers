/**
 * Class for manage unauthorized error
 */
export declare class UnauthorizedError extends Error {
    constructor();
    /**
     * Error trace property (string).
     */
    get trace(): string;
}
