/// <reference types="node" />
export declare class S3Helper {
    readonly aws_default_region: string;
    constructor();
    /**
     * Generate aws credentials by profile
     * @returns Credentials object
     */
    private static getCredentials;
    /**
     * Get S3 instance
     * @returns
     */
    private static getS3Bucket;
    /**
     * Async get file from S3
     * @param bucket_name Bucket name
     * @param bucket_key Bucket key
     * @returns S3 file data
     */
    get_s3_file(bucket_name: string, bucket_key: string): Promise<any>;
    /**
     * Async get file from S3
     * @param bucket_name Bucket name
     * @param bucket_key Bucket key
     * @param file_name
     * @returns S3 file data
     */
    get_s3_file_buffer(bucket_name: string, bucket_key: string, file_name: string): Promise<any>;
    /**
     * Async get file from S3
     * @param bucket_name Bucket name
     * @param bucket_key Bucket key
     * @param file_path
     * @returns S3 file data
     */
    get_s3_file_as_zip(bucket_name: string, bucket_key: string, file_path: string): Promise<any>;
    /**
     * Upload a file stream onto AWS S3
     * @param bucket_name Name of the bucket
     * @param bucket_key Key of the file to be uploaded
     * @param file Stream file buffer to be uploaded
     */
    upload_s3_file(bucket_name: string, bucket_key: string, file: Buffer): Promise<any>;
    /**
     * Upload a file stream onto AWS S3
     * @param bucket_name Name of the bucket
     * @param bucket_key Key of the file to be uploaded
     * @param file_path
     * @param content_type
     */
    upload_s3_file_path(bucket_name: string, bucket_key: string, file_path: string, content_type?: string): Promise<any>;
    /**
     * Check if a file exist in S3
     * @param bucket_name
     * @param bucket_key
     */
    s3_file_exist: (bucket_name: string, bucket_key: string) => Promise<boolean>;
}
