export declare namespace Elastic {
    function connect(): Promise<any>;
    function close(): Promise<any>;
    function client(): Promise<any>;
    function warmup(internal?: number): void;
}
