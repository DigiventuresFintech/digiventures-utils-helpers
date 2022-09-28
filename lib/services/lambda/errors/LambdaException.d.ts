export declare class LambdaException extends Error {
    private readonly _internalError;
    private readonly _body;
    constructor(message: string, internalError?: number, body?: any);
    get internalError(): number;
    get body(): any;
    get trace(): string;
}
