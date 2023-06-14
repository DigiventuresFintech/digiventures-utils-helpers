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
exports.ElasticSearchConnection = void 0;
const elasticsearch_1 = require("@elastic/elasticsearch");
const SecretManager_1 = require("../../services/secret/SecretManager");
class ElasticSearchConnection {
    constructor(options) {
        /**
         * Default credentials arn
         */
        this.DEFAULT_ELASTICSEARCH_CREDENTIALS_ARN = 'arn:aws:secretsmanager:us-east-1:810659965432:secret:elasticsearch_credentials_dev-3us0AX';
        this.client = null;
        this.workspace = (options === null || options === void 0 ? void 0 : options.workspace) || 'default';
        this.credentialsArn =
            (options === null || options === void 0 ? void 0 : options.credentialsArn) ||
                process.env.ELASTICSEARCH_CREDENTIALS_ARN ||
                this.DEFAULT_ELASTICSEARCH_CREDENTIALS_ARN;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.client) {
                const credentials = yield this.getCredentials();
                if (credentials) {
                    const { url, credentials: auth = {} } = credentials;
                    this.client = new elasticsearch_1.Client({
                        node: url,
                        auth,
                    });
                    try {
                        yield this.client.ping({}, { requestTimeout: 20000 });
                        console.log('Elasticsearch client successfully connected..');
                    }
                    catch (e) {
                        console.error('Elasticsearch client cannot be connected', e);
                        throw new Error('Elasticsearch client cannot be connected');
                    }
                }
            }
            return this.client;
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.client) {
                try {
                    yield this.client.close();
                }
                catch (e) {
                    console.error('error closing Elasticsearch client', e);
                    throw new Error('error closing Elasticsearch client');
                }
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
                console.error('elasticsearch credentials error', e);
                throw e;
            }
            return credentials[this.workspace] || credentials;
        });
    }
}
exports.ElasticSearchConnection = ElasticSearchConnection;
