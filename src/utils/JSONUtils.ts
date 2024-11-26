import * as _ from 'lodash';

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
        JSONUtils.deepTraverse(jsonObject[jsonObjectKey], key, renameKey);
      }
    }
  }

  public static flattenObject(obj: any, prefix = 'information.documentacion') {
    if (obj == null || typeof obj !== 'object') {
      return { [prefix]: obj };
    }

    return Object.keys(obj).reduce((acc: acc, k) => {
      const pre: any = prefix.length ? prefix + '.' : '';
      if (typeof obj[k] === 'object' && !Array.isArray(obj[k]))
        Object.assign(acc, this.flattenObject(obj[k], pre + k));
      else acc[pre + k] = obj[k];
      return acc;
    }, {});
  }

  /**
   * Calculate the differences between two jsons keys
   * @param jsonA JSON A
   * @param jsonB JSON B
   * @param parentKey JSON recursive parent key
   * @param result Resulting differences
   * @param options
   */
  public static jsonDifference(
    jsonA: any,
    jsonB: any,
    parentKey: string = '',
    result: any = {},
    options: any = {},
  ): void {
    for (const key in jsonA) {
      if (jsonA[key] != null && typeof jsonA[key] === 'object') {
        const pKey: string = parentKey ? `${parentKey}.${key}` : key;
        if (options?.onlyAttributes) {
          this.jsonDifference(jsonA[key], jsonB, pKey, result, options);
        } else {
          if (jsonB.hasOwnProperty(key)) {
            this.jsonDifference(jsonA[key], jsonB[key], pKey, result, options);
          }
        }
      } else {
        const pKey: string = parentKey ? `${parentKey}.${key}` : key;

        if (options?.onlyAttributes) {
          const bValue: any = _.get(jsonB, pKey);
          if (!bValue) {
            const aValue = _.get(jsonA, key);
            if (aValue) {
              _.set(result, pKey, aValue);
            }
          }
        } else {
          if (jsonB.hasOwnProperty(key)) {
            if (
              typeof jsonB[key] == 'string' &&
              typeof jsonA[key] == 'string'
            ) {
              const aValue: string = jsonA[key];
              const bValue: string = jsonB[key];
              if (aValue.toLowerCase() != bValue.toLowerCase()) {
                _.set(result, pKey, bValue);
              }
            } else if (
              typeof jsonB[key] == 'number' &&
              typeof jsonA[key] == 'number'
            ) {
              const aValue: number = jsonA[key];
              const bValue: number = jsonB[key];
              if (aValue != bValue) {
                _.set(result, pKey, bValue);
              }
            }
          }
        }
      }
    }
  }
}
