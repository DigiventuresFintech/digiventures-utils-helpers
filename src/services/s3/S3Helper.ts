import AWS from 'aws-sdk';
import S3, {
    GetObjectRequest,
    ListObjectVersionsOutput,
} from 'aws-sdk/clients/s3';
import * as fs from 'fs';
import { Credentials, CredentialsOptions } from 'aws-sdk/lib/credentials';

export class S3Helper {
    readonly aws_default_region: string = 'us-east-1';
    readonly aws_default_profile_name: string = 'digiventures-operaciones-prod';
    readonly s3Instance: S3;

    constructor(
        credentials?: Credentials | CredentialsOptions,
        region?: string,
    ) {
        if (credentials) {
            this.s3Instance = new S3({
                credentials: credentials,
                region: region || this.aws_default_region,
            });
        } else {
            this.s3Instance = new S3({
                region: region || this.aws_default_region,
            });
        }
    }

    /**
     * Generate aws credentials by profile
     * @returns Credentials object
     */
    private getCredentials(profile?: string): any {
        return new AWS.SharedIniFileCredentials({
            profile: profile || this.aws_default_profile_name,
        });
    }

    /**
     * Async get file from S3
     * @param bucket_name Bucket name
     * @param bucket_key Bucket key
     * @returns S3 file data
     */
    public async get_s3_file(
        bucket_name: string,
        bucket_key: string,
    ): Promise<any> {
        try {
            const data = await this.s3Instance
                .getObject({
                    Bucket: bucket_name,
                    Key: bucket_key,
                })
                .promise();

            return data.Body;
        } catch (e) {
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
    public async get_s3_file_buffer(
        bucket_name: string,
        bucket_key: string,
        file_name: string,
    ): Promise<any> {
        try {
            const params: GetObjectRequest = {
                Bucket: bucket_name,
                Key: bucket_key,
            };

            const file = fs.createWriteStream(file_name);
            return new Promise<void>((resolve, reject) => {
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
        } catch (e) {
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
    public async get_s3_file_as_zip(
        bucket_name: string,
        bucket_key: string,
        file_path: string,
    ): Promise<any> {
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
        } catch (e) {
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
    public async upload_s3_file(
        bucket_name: string,
        bucket_key: string,
        file: Buffer,
        content_type = 'text/plain',
    ): Promise<any> {
        try {
            return await this.s3Instance
                .upload({
                    Bucket: bucket_name,
                    Key: bucket_key,
                    Body: file,
                    ContentType: content_type,
                })
                .promise();
        } catch (error) {
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
    public async upload_s3_file_path(
        bucket_name: string,
        bucket_key: string,
        file_path: string,
        content_type = 'text/plain',
    ): Promise<any> {
        try {
            const stream = fs.createReadStream(file_path);
            return await this.s3Instance
                .upload({
                    Bucket: bucket_name,
                    Key: bucket_key,
                    ContentType: content_type,
                    Body: stream,
                })
                .promise();
        } catch (error) {
            throw new Error(`Could not upload file to S3: ${error}`);
        }
    }

    /**
     * Check if a file exist in S3
     * @param bucket_name
     * @param bucket_key
     */
    public s3_file_exist = async (bucket_name: string, bucket_key: string) => {
        try {
            await this.s3Instance
                .headObject({
                    Bucket: bucket_name,
                    Key: bucket_key,
                })
                .promise();
            return true;
        } catch (err) {
            // @ts-ignore
            if (err.code === 'NotFound') {
                return false;
            }
            throw err;
        }
    };

    public async get_file_by_version(
        bucket_name: string,
        bucket_key: string,
        version?: string,
    ): Promise<any> {
        try {
            const listObjectVersionsResponse = await this.s3Instance
                .listObjectVersions({ Bucket: bucket_name, Prefix: bucket_key })
                .promise();

            let targetVersion;

            if (version) {
                targetVersion = listObjectVersionsResponse.Versions?.find(
                    v => v.VersionId === version,
                );
            }

            if (!targetVersion) {
                targetVersion = listObjectVersionsResponse.Versions?.reduce(
                    (latest, version) => {
                        if (
                            !latest ||
                            (version.LastModified &&
                                latest.LastModified &&
                                version.LastModified > latest.LastModified)
                        ) {
                            return version;
                        }
                        return latest;
                    },
                );
            }

            if (!targetVersion) {
                throw new Error(`latest s3 file version not found`);
            }

            const getObjectResponse = await this.s3Instance
                .getObject({
                    Bucket: bucket_name,
                    Key: targetVersion.Key!,
                    VersionId: targetVersion.VersionId!
                }).promise();
            return getObjectResponse.Body;
        } catch (error) {
            console.error('error get_file_by_version', error);
            throw error;
        }
    }
}
