"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
                delete (jsonObject[key]);
                return;
            }
            if (jsonObject[jsonObjectKey] != null && typeof jsonObject[jsonObjectKey] === 'object') {
                JSONUtils.deepTraverse(jsonObject[jsonObjectKey], key, renameKey);
            }
        }
    }
}
exports.default = JSONUtils;
