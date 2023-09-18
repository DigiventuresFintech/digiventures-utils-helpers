import { IFtpClientManager } from "./IFtpClientManager";
import { dirname } from 'path';
import { Client, AccessOptions } from 'basic-ftp';
import { Readable } from "stream";

export class FtpClientManager implements IFtpClientManager {
  readonly client = new Client();
  private options: any

  constructor(options: any) {
    this.options = options;
  }

  async connect(): Promise<any> {
    try {
      const ftpOptions: AccessOptions = {
        host: this.options.host || process.env.SFTP_HOST,
        user: this.options.username || process.env.SFTP_USER,
        password: this.options.password || process.env.SFTP_PASS,
        port: parseInt(process.env.SFTP_PORT as string) ?? 22,
        secure: "implicit"
      };
      //  Enable ftp debug logs
      this.client.ftp.verbose = true

      // Log progress for any transfer from now on.
      this.client.trackProgress(info => {
        console.log("File", info.name)
        console.log("Type", info.type)
        console.log("Transferred", info.bytes)
        console.log("Transferred Overall", info.bytesOverall)
      })

      await this.client.access(ftpOptions);
    } catch (e) {
      console.error(`error connecting ftp client ${this.options.host}:${this.options.port}`, e)
      throw e
    }

    return this.client
  }

  async put(origin: Readable | string, dest: string, createDir?: boolean): Promise<any> {
    const filename: string = dest.substring(dest.lastIndexOf('/') + 1)
    if (createDir) {
      await this.createSftpDirs(dest)
    }

    try {
      return await this.client.uploadFrom(origin, filename)
    } catch (e) {
      console.error('error uploading file to sftp', e)
      throw e
    }
  }

  async createSftpDirs(path: string): Promise<void> {
    const normalizedPath: string = path.substring(0, path.lastIndexOf('/'))
    try {
      console.log('trying to create ftp directory', normalizedPath)
      await this.client.ensureDir(normalizedPath);
    } catch (e) {
      console.error('error creating ftp directory', normalizedPath, e)
    }

  }

  async close(): Promise<void> {
    if (this.client) {
      this.client.close();
    }
  }
}
