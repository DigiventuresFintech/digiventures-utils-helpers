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
}
export {};
