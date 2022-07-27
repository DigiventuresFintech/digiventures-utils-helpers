export declare class HttpError extends Error {
    message: string;
    statusCode: number;
    body: null;
    /**
     * If this is set to true the error should be reported back to the client.
     * @type {boolean}
     */
    passthrough: boolean;
    constructor(message: string, statusCode?: number, body?: null);
}
