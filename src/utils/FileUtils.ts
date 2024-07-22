import _ from 'lodash';
import { Readable } from 'stream';

export class FileUtils {
  /**
   * Decode mimetype in Base64 string using "Magic Numbers"
   * @ref https://en.wikipedia.org/wiki/Magic_number_(programming)
   * @ref https://stackoverflow.com/questions/57976898/how-to-get-mime-type-from-base-64-string
   * @param base64 Base64 encoded string
   */
  public static get_base64_mimetype(base64: string): string {
    const signatures = {
      JVBERi0: 'application/pdf',
      iVBORw0KGgo: 'image/png',
      '/9j/': 'image/jpg',
    };
    for (const signaturesKey in signatures) {
      if (base64.indexOf(signaturesKey) == 0) {
        return signatures[signaturesKey as keyof typeof signatures];
      }
    }
    return '';
  }

  /**
   * Converts mimetype to file extension
   * @param mimetype Decoded mimetype
   */
  public static mimetype_to_extension(mimetype: string): string {
    const extensions = {
      'application/pdf': 'pdf',
      'image/png': 'png',
      'image/jpg': 'jpg',
      default: '',
    };

    return (
      extensions[mimetype as keyof typeof extensions] ?? extensions.default
    );
  }

  public static generateCSV(csv: string, data: any): string {
    const lines: string[] = csv.split('\n');

    if (lines.length < 2) {
      throw new Error('CSV is invalid');
    }

    const trail: string = lines[0];
    const lineData: string = lines[1];
    const output: string[] = [trail];

    function generateLine(data: any, line: string): string {
      const fields: string[] = line.split(',');
      let outputLine = '';

      for (const field of fields) {
        const value = _.get(data, field, '');
        const trimmedValued = typeof value === 'string' ? value.trim() : value;
        outputLine += trimmedValued + ',';
      }

      return outputLine.substring(0, outputLine.length - 1);
    }

    if (Array.isArray(data)) {
      for (const _data of data) {
        output.push(generateLine(_data, lineData));
      }
    } else {
      output.push(generateLine(data, lineData));
    }

    return output.join('\n');
  }
}

export const streamToBuffer = (stream: Readable): Promise<Buffer> =>
  new Promise((resolve, reject) => {
    const chunks: any[] = [];
    stream.on('data', chunk => chunks.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', reject);
  });
