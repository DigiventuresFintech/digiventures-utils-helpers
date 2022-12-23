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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Helper = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const s3_1 = __importDefault(require("aws-sdk/clients/s3"));
const fs = __importStar(require("fs"));
class S3Helper {
    constructor(credentials, region) {
        this.aws_default_region = 'us-east-1';
        this.aws_default_profile_name = 'digiventures-operaciones-prod';
        /**
         * Check if a file exist in S3
         * @param bucket_name
         * @param bucket_key
         */
        this.s3_file_exist = async (bucket_name, bucket_key) => {
            try {
                await this.s3Instance
                    .headObject({
                    Bucket: bucket_name,
                    Key: bucket_key,
                })
                    .promise();
                return true;
            }
            catch (err) {
                // @ts-ignore
                if (err.code === 'NotFound') {
                    return false;
                }
                throw err;
            }
        };
        if (credentials) {
            this.s3Instance = new s3_1.default({
                credentials: credentials,
                region: region || this.aws_default_region,
            });
        }
        else {
            this.s3Instance = new s3_1.default({
                region: region || this.aws_default_region,
            });
        }
    }
    /**
     * Generate aws credentials by profile
     * @returns Credentials object
     */
    getCredentials(profile) {
        return new aws_sdk_1.default.SharedIniFileCredentials({
            profile: profile || this.aws_default_profile_name,
        });
    }
    /**
     * Async get file from S3
     * @param bucket_name Bucket name
     * @param bucket_key Bucket key
     * @returns S3 file data
     */
    async get_s3_file(bucket_name, bucket_key) {
        try {
            const data = await this.s3Instance
                .getObject({
                Bucket: bucket_name,
                Key: bucket_key,
            })
                .promise();
            return data.Body;
        }
        catch (e) {
            throw e;
        }
    }
    /**
     * Async get file from S3
     * @param bucket_name Bucket name
     * @param bucket_key Bucket key
     * @param file_name
     * @returns S3 file data
     */
    async get_s3_file_buffer(bucket_name, bucket_key, file_name) {
        try {
            const params = {
                Bucket: bucket_name,
                Key: bucket_key,
            };
            const file = fs.createWriteStream(file_name);
            return new Promise((resolve, reject) => {
                this.s3Instance
                    .getObject(params)
                    .createReadStream()
                    .on('end', () => {
                    console.error('get_s3_file_buffer end success');
                    return resolve();
                })
                    .on('error', error => {
                    console.error(`get_s3_file_buffer error + ${error}`);
                    return reject(error);
                })
                    .pipe(file);
            });
        }
        catch (e) {
            console.error(`get_s3_file_buffer + ${e}`);
            throw e;
        }
    }
    /**
     * Async get file from S3
     * @param bucket_name Bucket name
     * @param bucket_key Bucket key
     * @param file_path
     * @returns S3 file data
     */
    async get_s3_file_as_zip(bucket_name, bucket_key, file_path) {
        try {
            console.log(`Creating writeable zip file ${file_path}`);
            const data = await this.s3Instance
                .getObject({
                Bucket: bucket_name,
                Key: bucket_key,
            })
                .promise();
            console.log('File created');
            return data;
        }
        catch (e) {
            console.error(`get_s3_file_as_zip + ${e}`);
            throw e;
        }
    }
    /**
     * Upload a file stream onto AWS S3
     * @param bucket_name Name of the bucket
     * @param bucket_key Key of the file to be uploaded
     * @param file Stream file buffer to be uploaded
     * @param content_type
     */
    async upload_s3_file(bucket_name, bucket_key, file, content_type = 'text/plain') {
        try {
            await this.s3Instance
                .upload({
                Bucket: bucket_name,
                Key: bucket_key,
                Body: file,
                ContentType: content_type,
            })
                .promise();
        }
        catch (error) {
            throw new Error(`Could not upload file to S3: ${error}`);
        }
    }
    /**
     * Upload a file stream onto AWS S3
     * @param bucket_name Name of the bucket
     * @param bucket_key Key of the file to be uploaded
     * @param file_path
     * @param content_type
     */
    async upload_s3_file_path(bucket_name, bucket_key, file_path, content_type = 'text/plain') {
        try {
            const stream = fs.createReadStream(file_path);
            await this.s3Instance
                .upload({
                Bucket: bucket_name,
                Key: bucket_key,
                ContentType: content_type,
                Body: stream,
            })
                .promise();
        }
        catch (error) {
            throw new Error(`Could not upload file to S3: ${error}`);
        }
    }
}
exports.S3Helper = S3Helper;
