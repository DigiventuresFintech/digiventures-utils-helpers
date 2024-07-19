import { IFtpClientManager } from './IFtpClientManager';
import { Client, AccessOptions } from 'basic-ftp';
import { Readable } from 'stream';

export class FtpClientManager implements IFtpClientManager {
  private readonly client;
  private options: any;
  private workingDirectory: string;

  constructor(options: any) {
    const log = options.logger || console.log;

    const timeout = options?.timeout
      ? parseInt(options.timeout)
      : undefined ?? 60000;

    this.client = new Client(timeout);

    this.options = options;
    this.workingDirectory = '';
    this.client.ftp.verbose = true;
    this.client.trackProgress(info => {
      log(`File: ${info.name}`);
      log(`Type: ${info.type}`);
      log(`Transferred: ${info.bytes}`);
      log(`Transferred Overall: ${info.bytesOverall}`);
    });
  }

  async connect(): Promise<any> {
    try {
      let ftpOptions: AccessOptions = {
        host: this.options.host || process.env.SFTP_HOST,
        user: this.options.username || process.env.SFTP_USER,
        password: this.options.password || process.env.SFTP_PASS,
        port:
          this.options.port || parseInt(process.env.SFTP_PORT as string) || 22,
        secure: this.options?.secure
          ? this.options.secure === 'true'
          : 'implicit',
      };

      await this.client.access(ftpOptions);
    } catch (e) {
      console.error(
        `error connecting ftp client ${this.options.host}:${this.options.port}`,
        e,
      );
      throw e;
    }

    return this.client;
  }

  async put(
    origin: Readable | string,
    dest: string,
    createDir?: boolean,
  ): Promise<any> {
    const destFileName: string = dest.substring(dest.lastIndexOf('/') + 1);
    const destFilePath: string = dest.substring(0, dest.lastIndexOf('/'));

    if (this.workingDirectory !== destFilePath) {
      if (this.workingDirectory.length > 0) {
        await this.client.cd('/');
      }
      this.workingDirectory = await this.createSftpDirs(destFilePath);
    }

    try {
      return await this.client.uploadFrom(origin, destFileName);
    } catch (e) {
      console.error('error uploading file to sftp', e);
      throw e;
    }
  }

  async createSftpDirs(path: string): Promise<string> {
    try {
      console.log('trying to create ftp directory', path);
      await this.client.ensureDir(path);
    } catch (e) {
      console.error('error creating ftp directory', path, e);
    }
    return path;
  }

  async close(): Promise<void> {
    if (this.client) {
      this.client.close();
    }
  }
}
