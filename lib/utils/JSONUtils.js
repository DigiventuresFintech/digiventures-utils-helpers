"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONUtils = void 0;
const _ = __importStar(require("lodash"));
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
    static flattenObject(obj, prefix = 'information.documentacion') {
        return Object.keys(obj).reduce((acc, k) => {
            const pre = prefix.length ? prefix + '.' : '';
            if (typeof obj[k] === 'object' && !Array.isArray(obj[k]))
                Object.assign(acc, this.flattenObject(obj[k], pre + k));
            else
                acc[pre + k] = obj[k];
            return acc;
        }, {});
    }
    /**
     * Calculate the differences between two jsons keys
     * @param jsonA JSON A
     * @param jsonB JSON B
     * @param parentKey JSON recursive parent key
     * @param result Resulting differences
     */
    static jsonDifference(jsonA, jsonB, parentKey = '', result = {}) {
        for (const key in jsonA) {
            if (jsonA[key] != null && typeof jsonA[key] === 'object') {
                const pKey = parentKey ? `${parentKey}.${key}` : key;
                if (jsonB.hasOwnProperty(key)) {
                    this.jsonDifference(jsonA[key], jsonB[key], pKey, result);
                }
            }
            else {
                if (jsonB.hasOwnProperty(key)) {
                    const pKey = parentKey
                        ? `${parentKey}.${key}`
                        : key;
                    if (typeof jsonB[key] == 'string' &&
                        typeof jsonA[key] == 'string') {
                        const aValue = jsonA[key];
                        const bValue = jsonB[key];
                        if (aValue.toLowerCase() != bValue.toLowerCase()) {
                            _.set(result, pKey, bValue);
                            return;
                        }
                    }
                    else if (typeof jsonB[key] == 'number' &&
                        typeof jsonA[key] == 'number') {
                        const aValue = jsonA[key];
                        const bValue = jsonB[key];
                        if (aValue != bValue) {
                            _.set(result, pKey, bValue);
                            return;
                        }
                    }
                }
            }
        }
    }
}
exports.JSONUtils = JSONUtils;
