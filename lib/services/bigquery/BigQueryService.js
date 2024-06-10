"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BigQueryService = void 0;
const bigquery_1 = require("@google-cloud/bigquery");
class BigQueryService {
    init(projectId) {
        try {
            const credentials = JSON.parse(process.env.BIGQUERY_CREDENTIALS);
            this.instance = new bigquery_1.BigQuery({
                projectId: projectId || process.env.BIGQUERY_DEFAULT_PROJECT_ID,
                credentials,
            });
        }
        catch (e) {
            console.error(e);
            throw new Error(`BigQuery instance couldn't be created, please make sure you have defined 'BIGQUERY_CREDENTIALS_ARN' environment variable`);
        }
    }
    query(query, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rows] = yield this.instance.query(query, options);
                return rows;
            }
            catch (e) { }
            return [];
        });
    }
}
exports.BigQueryService = BigQueryService;
//# sourceMappingURL=BigQueryService.js.map