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
const ElasticSearchConnection_1 = require("./ElasticSearchConnection");
var Elastic;
(function (Elastic) {
    const connection = new ElasticSearchConnection_1.ElasticSearchConnection();
    let instance = null;
    function connect() {
        return __awaiter(this, void 0, void 0, function* () {
            instance = yield connection.connect();
        });
    }
    Elastic.connect = connect;
    function close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield connection.close();
            instance = null;
        });
    }
    Elastic.close = close;
    function client() {
        return __awaiter(this, void 0, void 0, function* () {
            if (instance == null)
                yield connect();
            return instance;
        });
    }
    Elastic.client = client;
})(Elastic || (Elastic = {}));
//# sourceMappingURL=elasticsearch.js.map