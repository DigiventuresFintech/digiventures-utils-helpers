interface acc {
    [key: string]: [string];
}
export declare class JSONUtils {
    /**
     * Traverse JSON as BTree
     * @param jsonObject
     * @param key
     * @param renameKey
     */
    static deepTraverse(jsonObject: any, key: string, renameKey: string): void;
    static flattenObject(obj: any, prefix?: string): acc;
    /**
     * Calculate the differences between two jsons keys
     * @param jsonA JSON A
     * @param jsonB JSON B
     * @param parentKey JSON recursive parent key
     * @param result Resulting differences
     * @param options
     */
    static jsonDifference(
        jsonA: any,
        jsonB: any,
        parentKey?: string,
        result?: any,
        options?: any,
    ): void;
}
export {};
