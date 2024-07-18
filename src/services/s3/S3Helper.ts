import {
  GetObjectCommand,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
  ObjectCannedACL,
  HeadObjectCommand,
  ListObjectVersionsCommand,
} from '@aws-sdk/client-s3';
import { Readable } from 'stream';
import { streamToBuffer } from '../../utils/FileUtils';

export class S3Helper {
  readonly aws_default_region: string = 'us-east-1';
  readonly client: S3Client;

  constructor(credentials?: any, region?: string) {
    if (credentials) {
      this.client = new S3Client({
        credentials: credentials,
        region: region || this.aws_default_region,
      });
    } else {
      this.client = new S3Client({
        region: region || this.aws_default_region,
      });
    }
  }

  /**
   * Async get file from S3
   * @param bucket_name Bucket name
   * @param bucket_key Bucket key
   * @returns S3 file data
   */
  public async getObject(
    bucket_name: string,
    bucket_key: string,
  ): Promise<Buffer> {
    try {
      const command = new GetObjectCommand({
        Bucket: bucket_name,
        Key: bucket_key,
      });

      const { Body } = await this.client.send(command);
      const response = await Body?.transformToByteArray();
      return Buffer.from(response!);
    } catch (e) {
      throw e;
    }
  }

  /**
   * Upload a file stream onto AWS S3
   * @param bucket_name Name of the bucket
   * @param bucket_key Key of the file to be uploaded
   * @param file Stream file buffer to be uploaded
   * @param content_type
   * @param acl
   */
  public async putObject(
    bucket_name: string,
    bucket_key: string,
    file: Buffer,
    content_type = 'text/plain',
    acl?: ObjectCannedACL,
  ): Promise<any> {
    try {
      const params: PutObjectCommandInput = {
        Bucket: bucket_name,
        Key: bucket_key,
        Body: file,
        ContentType: content_type,
        ACL: acl,
      };

      const command = new PutObjectCommand(params);

      return await this.client.send(command);
    } catch (error) {
      throw new Error(`Could not upload file to S3: ${error}`);
    }
  }

  /**
   * Check if a file exist in S3
   * @param bucket_name
   * @param bucket_key
   */
  public async s3_file_exist(
    bucket_name: string,
    bucket_key: string,
  ): Promise<boolean> {
    try {
      const command = new HeadObjectCommand({
        Bucket: bucket_name,
        Key: bucket_key,
      });

      await this.client.send(command);
      return true;
    } catch (err) {
      if (err instanceof Error && err.name === 'NotFound') {
        return false;
      }
      throw err;
    }
  }

  public async get_file_by_version(
    bucket_name: string,
    bucket_key: string,
    version?: string,
  ): Promise<any> {
    try {
      const listCommand = new ListObjectVersionsCommand({
        Bucket: bucket_name,
        Prefix: bucket_key,
      });
      const listObjectVersionsResponse = await this.client.send(listCommand);

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

      const getObjectCommand = new GetObjectCommand({
        Bucket: bucket_name,
        Key: targetVersion.Key!,
        VersionId: targetVersion.VersionId!,
      });

      const getObjectResponse = await this.client.send(getObjectCommand);

      return streamToBuffer(getObjectResponse.Body as Readable);
    } catch (error) {
      console.error('error get_file_by_version', error);
      throw error;
    }
  }

  public async getObjectByVersionId(
    bucket: string,
    key: string,
    versionId: string,
  ): Promise<Buffer> {
    try {
      const getObjectCommand = new GetObjectCommand({
        Bucket: bucket,
        Key: key,
        VersionId: versionId,
      });

      const getObjectResponse = await this.client.send(getObjectCommand);

      return streamToBuffer(getObjectResponse.Body as Readable);
    } catch (error) {
      console.error('error getObjectByVersionId', error);
      throw error;
    }
  }
}
