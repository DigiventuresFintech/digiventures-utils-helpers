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
        this.auth = options === null || options === void 0 ? void 0 : options.auth;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            if (this.client) {
                return this.client;
            }
            let node = ((_a = this.auth) === null || _a === void 0 ? void 0 : _a.url) || process.env.ELASTICSEARCH_URL;
            let authCredentials = ((_b = this.auth) === null || _b === void 0 ? void 0 : _b.credentials) || {
                username: process.env.ELASTICSEARCH_USERNAME,
                password: process.env.ELASTICSEARCH_PASSWORD,
            };
            if (!node) {
                const credentials = yield this.getCredentials();
                if (credentials) {
                    node = credentials.url;
                    authCredentials = credentials.credentials || {};
                }
            }
            if (!node) {
                throw new Error('Elasticsearch URL is missing');
            }
            this.client = new elasticsearch_1.Client({
                node,
                auth: authCredentials,
            });
            try {
                yield this.client.ping({}, { requestTimeout: 20000 });
                console.log('Elasticsearch client successfully connected..');
                return this.client;
            }
            catch (e) {
                console.error('Elasticsearch client cannot be connected', e);
                throw new Error('Elasticsearch client cannot be connected');
            }
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.client) {
                try {
                    yield this.client.close();
                    this.client = null;
                }
                catch (e) {
                    console.error('error closing Elasticsearch client', e);
                    throw new Error('error closing Elasticsearch client');
                }
            }
        });
    }
    warmup(internal = 10000) {
        setInterval(() => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const maxRetries = (_a = (process.env.ELASTICSEARCH_CONN_RETIRES
                ? parseInt(process.env.ELASTICSEARCH_CONN_RETIRES)
                : undefined)) !== null && _a !== void 0 ? _a : 3;
            const retryDelay = (_b = (process.env.ELASTICSEARCH_CONN_RETRY_DELAY
                ? parseInt(process.env.ELASTICSEARCH_CONN_RETRY_DELAY)
                : undefined)) !== null && _b !== void 0 ? _b : 5000;
            let retries = 0;
            while (retries < maxRetries) {
                try {
                    yield this.client.ping();
                    console.log('Elasticsearch warmup OK');
                    break;
                }
                catch (error) {
                    console.error('Elasticsearch warmup error, retrying...');
                    retries++;
                    yield this.connect();
                    if (retries < maxRetries) {
                        /* exponential backoff retry method
                         * https://en.wikipedia.org/wiki/Exponential_backoff */
                        const currentRetryDelay = retries ? 0 : retryDelay !== null && retryDelay !== void 0 ? retryDelay : 100;
                        const delay = currentRetryDelay + ((Math.pow(2, retries) - 1) / 2) * 1000;
                        console.log(`Waiting ${delay / 1000} seconds before retrying...`);
                        yield new Promise(resolve => {
                            setTimeout(resolve, delay);
                        });
                    }
                }
            }
            if (retries === maxRetries) {
                console.error('Elasticsearch warmup failed after max retries');
            }
        }), internal);
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
//# sourceMappingURL=ElasticSearchConnection.js.map