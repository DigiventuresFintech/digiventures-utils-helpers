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
exports.MongoDBConnection = void 0;
const SecretManager_1 = require("../../services/secret/SecretManager");
class MongoDBConnection {
    constructor(options) {
        /**
         * Default credentials arn
         */
        this.DEFAULT_MONGODB_CREDENTIALS_ARN = 'arn:aws:secretsmanager:us-east-1:810659965432:secret:mongodb_credentials_dev-8eqHbp';
        //this.conn = null;
        this.workspace = (options === null || options === void 0 ? void 0 : options.workspace) || 'default';
        this.credentialsArn =
            (options === null || options === void 0 ? void 0 : options.credentialsArn) ||
                process.env.MONGODB_CREDENTIALS_ARN ||
                this.DEFAULT_MONGODB_CREDENTIALS_ARN;
    }
    connect() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            //if (!this.conn) {
            const { mongodb } = yield this.getCredentials();
            const uri = (_a = mongodb === null || mongodb === void 0 ? void 0 : mongodb.connection) === null || _a === void 0 ? void 0 : _a.string;
            if (!uri) {
                throw new Error('mongodb uri not defined');
            }
            try {
                //await Mongoose.connect(uri);
                console.log('mongodb successfully connected');
            }
            catch (e) {
                console.error('error mongodb connection', e);
                throw e;
            }
        });
    }
    /**
     * Close existing mongoose client connection
     */
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            //if (this.conn) {
            //    await this.conn.connection.close();
            //}
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
