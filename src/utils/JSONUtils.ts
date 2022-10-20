interface acc {
    [key: string]: [string];
}

export class JSONUtils {
    /**
     * Traverse JSON as BTree
     * @param jsonObject
     * @param key
     * @param renameKey
     */
    static deepTraverse(jsonObject: any, key: string, renameKey: string) {
        for (const jsonObjectKey in jsonObject) {
            if (jsonObjectKey == key) {
                jsonObject[renameKey] = jsonObject[key];
                delete jsonObject[key];
                return;
            }

            if (
                jsonObject[jsonObjectKey] != null &&
                typeof jsonObject[jsonObjectKey] === 'object'
            ) {
                JSONUtils.deepTraverse(
                    jsonObject[jsonObjectKey],
                    key,
                    renameKey,
                );
            }
        }
    }

    public static flattenObject(
        obj: any,
        prefix = 'information.documentacion',
    ) {
        return Object.keys(obj).reduce((acc: acc, k) => {
            const pre: any = prefix.length ? prefix + '.' : '';
            if (typeof obj[k] === 'object' && !Array.isArray(obj[k]))
                Object.assign(acc, this.flattenObject(obj[k], pre + k));
            else acc[pre + k] = obj[k];
            return acc;
        }, {});
    }
}
