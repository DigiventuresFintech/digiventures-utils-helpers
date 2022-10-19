"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONUtils = void 0;
class JSONUtils {
    /**
     * Traverse JSON as BTree
     * @param jsonObject
     * @param key
     * @param renameKey
     */
    static deepTraverse(jsonObject, key, renameKey) {
        for (const jsonObjectKey in jsonObject) {
            if (jsonObjectKey == key) {
                jsonObject[renameKey] = jsonObject[key];
                delete jsonObject[key];
                return;
            }
            if (jsonObject[jsonObjectKey] != null &&
                typeof jsonObject[jsonObjectKey] === 'object') {
                JSONUtils.deepTraverse(jsonObject[jsonObjectKey], key, renameKey);
            }
        }
    }
    static flattenObject(obj, prefix = "information.documentacion") {
        return Object.keys(obj).reduce((acc, k) => {
            const pre = prefix.length ? prefix + "." : "";
            if (typeof obj[k] === "object" && !Array.isArray(obj[k]))
                Object.assign(acc, this.flattenObject(obj[k], pre + k));
            else
                acc[pre + k] = obj[k];
            return acc;
        }, {});
    }
}
exports.JSONUtils = JSONUtils;
