import axios from 'axios';
import { S3Helper } from '../services/s3/S3Helper';

export class RestUtils {
  /**
   * Gets public file by url as arraybuffer
   * @param document File to load
   */
  public async getBase64File(document: string): Promise<any> {
    if (!document) {
      throw new Error(`Document not defined`);
    }

    const encoding = this.getFileMimetype(document);
    let pdfResponse: any;
    try {
      pdfResponse = await axios.get(document, {
        responseType: 'arraybuffer',
        responseEncoding: 'binary',
        headers: {
          'Content-Type': encoding,
        },
      });
    } catch (e) {
      throw e;
    }
    console.log(`File obtained successfully ${document}`);
    return pdfResponse;
  }

  /**
   * Gets a public file by url and convert it into a base64 string
   * @param document File to load
   */
  public async getBase64FileAsString(document: string): Promise<string> {
    if (!document) {
      throw new Error(`Document not defined`);
    }

    const encoding = this.getFileMimetype(document);
    let response: any;
    try {
      response = await axios.get(document, {
        responseType: 'arraybuffer',
        responseEncoding: 'binary',
        headers: {
          'Content-Type': encoding,
        },
      });
    } catch (e) {
      throw e;
    }
    console.log(`File obtained successfully ${document}`);
    return Buffer.from(response.data).toString('base64');
  }

  /**
   * Gets a public file by url and convert it into a base64 string
   * @param document File to load
   */
  public async getBase64FileAsStringFromS3(document: string): Promise<string> {
    if (!document) {
      throw new Error(`Document not defined`);
    }

    const regex = /(https:\/\/s3.amazonaws.com)(\/.*?\/)(.*)/;
    const matchedUrl = document.match(regex);
    if (!matchedUrl) {
      throw new Error('Error match s3 utl');
    }
    const bucketName = matchedUrl[2].replace(/\//g, '');
    const bucketKey = matchedUrl[3];
    console.log('get from bucket and key', bucketName, bucketKey);

    const s3Helper: S3Helper = new S3Helper();
    let response: any;
    try {
      response = await s3Helper.getObject(bucketName, bucketKey);
    } catch (e) {
      console.error(e);
      throw e;
    }
    console.log(`File obtained successfully ${document}`);
    return Buffer.from(response).toString('base64');
  }

  /**
   * Get mimetype based on end of string
   * @param file
   */
  public getFileMimetype(file: string): string {
    if (file.endsWith('pdf')) {
      return 'application/pdf';
    } else if (file.endsWith('png')) {
      return 'image/png';
    }
    return 'application/pdf'; // << rly?
  }

  /**
   * Get mimetype by extension
   * @param extension
   */
  public getMimetype(extension: string): string {
    switch (extension) {
      case 'pdf':
        return 'application/pdf';
      case 'png':
        return 'image/png';
      default:
        return 'application/pdf';
    }
  }
}
