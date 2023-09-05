import { IFtpClientManager } from "./IFtpClientManager";
import { dirname } from 'path';
import SFTPClient from "ssh2-sftp-client";

export class FtpClientManager implements IFtpClientManager {
  readonly sftp = new SFTPClient();
  private options: any

  constructor(options: any) {
    this.options = options;
  }

  async connect(): Promise<any> {
    try {
      await this.sftp.connect({
        host: this.options.host || process.env.SFTP_HOST,
        port: parseInt(process.env.SFTP_PORT as string) ?? 22,
        username: this.options.username || process.env.SFTP_USER,
        password: this.options.password || process.env.SFTP_PASS
      });
    } catch (e) {
      console.error('error connecting ftp client', e)
      throw new Error(`error connecting ftp client`)
    }

    return this.sftp
  }

  async put(origin: Buffer | string, dest: string, createDir?: boolean): Promise<string> {
    if (createDir) {
      await this.createSftpDirs(dest)
    }

    try {
      return await this.sftp.put(origin, dest)
    } catch (e) {
      console.error('error uploading file to sftp', e)
      throw e
    }
  }

  async createSftpDirs(path: string): Promise<void> {
    const dirPath = dirname(path);
    const dirExists = await this.sftp.exists(dirPath);

    if (!dirExists) {
      await this.sftp.mkdir(dirPath, true);
    }
  }

  async close(): Promise<void> {
    if (this.sftp) {
      await this.sftp.end();
    }
  }
}
