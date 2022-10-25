import AWS from 'aws-sdk';
import S3, { GetObjectRequest } from 'aws-sdk/clients/s3';
import * as fs from 'fs';

export class S3Helper {
    readonly aws_default_region: string = 'us-east-1';

    constructor() {}

    /**
     * Generate aws credentials by profile
     * @returns Credentials object
     */
    private static getCredentials(): any {
        return new AWS.SharedIniFileCredentials({
            profile: 'digiventures-operaciones-prod',
        });
    }

    /**
     * Get S3 instance
     * @returns
     */
    private static getS3Bucket(): S3 {
        return new S3({
            //credentials: S3Helper.getCredentials(),
            region: 'us-east-1',
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
            const data = await S3Helper.getS3Bucket()
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
                S3Helper.getS3Bucket()
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
            const writeStream = fs.createWriteStream(file_path);
            const data = await S3Helper.getS3Bucket()
                .getObject({
                    Bucket: bucket_name,
                    Key: bucket_key,
                })
                .promise()
                .then(async data => {
                    // const zip = await JSZip.loadAsync(data.Body);
                    // fs.writeFileSync(file_path, data.Body);
                });

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
     */
    public async upload_s3_file(
        bucket_name: string,
        bucket_key: string,
        file: Buffer,
    ): Promise<any> {
        try {
            await S3Helper.getS3Bucket()
                .upload({
                    Bucket: bucket_name,
                    Key: bucket_key,
                    Body: file,
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
            await S3Helper.getS3Bucket()
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
            await S3Helper.getS3Bucket()
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
}
