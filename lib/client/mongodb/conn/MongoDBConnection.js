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
exports.MongoDBConnection = void 0;
const SecretManager_1 = require("../../../services/secret/SecretManager");
const mongoose = __importStar(require("mongoose"));
class MongoDBConnection {
    constructor(options) {
        /**
         * Default credentials arn
         */
        this.DEFAULT_MONGODB_CREDENTIALS_ARN = 'arn:aws:secretsmanager:us-east-1:810659965432:secret:mongodb_credentials_dev-8eqHbp';
        this.conn = null;
        this.workspace = (options === null || options === void 0 ? void 0 : options.workspace) || 'default';
        this.options = options || {};
        this.credentialsArn =
            (options === null || options === void 0 ? void 0 : options.credentialsArn) ||
                process.env.MONGODB_CREDENTIALS_ARN ||
                this.DEFAULT_MONGODB_CREDENTIALS_ARN;
    }
    connect() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f;
            if (this.conn) {
                resolve(this.conn);
                return;
            }
            try {
                let uri = (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.uri) !== null && _b !== void 0 ? _b : (_e = (_d = (_c = (yield this.getCredentials())) === null || _c === void 0 ? void 0 : _c.mongodb) === null || _d === void 0 ? void 0 : _d.connection) === null || _e === void 0 ? void 0 : _e.string;
                if (!uri) {
                    reject(new Error('mongodb uri not defined'));
                    return;
                }
                uri = uri.replace('${database}', ((_f = this.options) === null || _f === void 0 ? void 0 : _f.database) || 'documents');
                this.conn = yield mongoose.connect(uri);
                console.log('mongodb successfully connected');
                resolve(this.conn);
            }
            catch (e) {
                console.error('error mongodb connection', e);
                reject(e);
            }
        }));
    }
    /**
     * Close existing mongoose client connection
     */
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.conn) {
                yield this.conn.connection.close();
            }
        });
    }
    /**
     * Retrieves credentials asynchronously.
     *
     * @return A Promise representing the credentials.
     * @throws Exception If an error occurs while retrieving the credentials.
     */
    getCredentials() {
        return __awaiter(this, void 0, void 0, function* () {
            let credentials;
            try {
                credentials = yield new SecretManager_1.SecretManager().getSecret(this.credentialsArn);
            }
            catch (e) {
                console.error('mongodb credentials error', e);
                throw e;
            }
            return credentials[this.workspace] || credentials;
        });
    }
}
exports.MongoDBConnection = MongoDBConnection;
//# sourceMappingURL=MongoDBConnection.js.map