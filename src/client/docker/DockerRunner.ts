import Dockerode from 'dockerode';
import {
  DockerCreateOptionsType,
  DockerRunCommandType,
  DockerStartOptionsType,
} from './docker.types';
import stream from 'stream';
import * as os from 'os';

type Volumes = { [volume: string]: {} };

export class DockerRunner {
  private dockerode: Dockerode;
  private existingImages: { [key: string]: boolean } = {};

  constructor() {
    //this.dockerode = new Dockerode({ socketPath: '/var/run/docker.sock' });
    //127.0.0.1:2375
    this.dockerode = new Dockerode({ host: '127.0.0.1', port: 2375 });
  }

  setup() {
    this.dockerode
      .version()
      .then(res => console.log(`Use docker version: ${res.Version}`))
      .catch(e => {
        throw new Error(`[x] command [docker]: ${e.message}`);
      });
  }

  async run(params: DockerRunCommandType): Promise<any> {
    await this.pullImage(params);

    const { image, tag, commands, ignoreError } = params;
    const createOptions: DockerCreateOptionsType = params.createOptions || {
      AttachStdout: true,
      HostConfig: {
        AutoRemove: params.autoRemove !== undefined ? params.autoRemove : true,
        NetworkMode: params.network,
        Binds: params.volumes,
      },
      User: params.user !== false ? `${this.getUID()}:${this.getGID()}` : '',
    };

    const startOptions: any =
      params.startOptions || ({} as DockerStartOptionsType);
    try {
      let stdout = '';
      const stdoutStream = new stream.Writable({
        write: function (chunk, encoding, callback) {
          stdout += chunk.toString();
          callback();
        },
      });
      await this.dockerode.run(
        `${image}:${tag || 'latest'}`,
        commands,
        stdoutStream,
        createOptions,
        startOptions,
      );
      console.log(`run command output: \n${stdout}`);
      console.log(
        `docker run\n  image: ${image}\n  commands: ${commands.join(' ')}`,
      );
      return {
        stdout: stdout.toString(),
      };
    } catch (e: any) {
      throw new Error(`[x] command [docker run]:${e.message}`);
    }
  }

  async createContainer(
    params: DockerRunCommandType,
  ): Promise<Dockerode.Container> {
    await this.pullImage(params);

    const { image, tag, commands, ignoreError } = params;
    const createOptions: DockerCreateOptionsType = params.createOptions || {
      AttachStdout: true,
      HostConfig: {
        AutoRemove: params.autoRemove !== undefined ? params.autoRemove : true,
        NetworkMode: params.network,
      },
      User: params.user !== false ? `${this.getUID()}:${this.getGID()}` : '',
    };

    try {
      return await this.dockerode.createContainer({
        name: params.name,
        Image: `${image}:${tag || 'latest'}`,
        Cmd: commands,
        ...createOptions,
        Volumes: this.convertVolumes(params.volumes),
        AttachStderr: true,
        AttachStdin: false,
        AttachStdout: true,
        OpenStdin: false,
        StdinOnce: false,
      });
    } catch (e) {
      throw new Error(`[x] command [docker create container]:${e}`);
    }
  }

  async start(container: Dockerode.Container, wait?: boolean) {
    try {
      await container.start();
      if (wait) {
        await container.wait();
      }
    } catch (e: any) {
      throw new Error(`[x] command [docker run]:${e.message}`);
    }
  }

  private async pullImage(params: DockerRunCommandType): Promise<void> {
    const tag = params.tag || 'latest';
    if (!this.existingImages[`${params.image}:${tag}`]) {
      const images = await this.dockerode.listImages({
        filters: { reference: [`${params.image}:${tag}`] },
      });
      if (images.length === 0) {
        await this.dockerode.pull(`${params.image}:${tag}`, {
          auth: params.auth,
        });
        while (true) {
          const images = await this.dockerode.listImages({
            filters: { reference: [`${params.image}:${tag}`] },
          });
          if (images.length !== 0) break;
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
        this.existingImages[`${params.image}:${tag}`] = true;
      }
    }
  }

  async getContainerFile(
    container: Dockerode.Container,
    filePath: string,
  ): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      container.getArchive({ path: filePath }, (err, stream) => {
        if (err || !stream) {
          return reject(err);
        }
        const chunks: any[] = [];
        stream.on('data', chunk => {
          chunks.push(chunk);
        });
        stream.on('end', () => {
          const buffer = Buffer.concat(chunks);
          resolve(buffer);
        });
        stream.on('error', reject);
      });
    });
  }

  async putArchive(container: Dockerode.Container, path: string, data: Buffer) {
    try {
      await container.putArchive(data, { path });
    } catch (e) {
      throw new Error(`[x] command [docker put archive]:${e}`);
    }
  }

  public async getContainerId(name: string): Promise<string> {
    const opts = {
      limit: 1,
      filters: { name: [`${name}`] },
    };

    return new Promise((resolve, reject) => {
      this.dockerode.listContainers(opts, (err, containers) => {
        if (err) {
          reject(err);
        } else {
          if (containers?.length === 0) {
            return reject();
          }

          resolve(containers![0].Id);
        }
      });
    });
  }

  async getActiveContainer(name: string): Promise<Dockerode.Container | null> {
    try {
      const containerId = (await this.getContainerId(name)) as string;
      return this.dockerode.getContainer(containerId);
    } catch (e) {
      return null;
    }
  }

  getUID = () => {
    return process.env.UID === undefined
      ? os.userInfo().uid
      : parseInt(process.env.UID, 10);
  };

  getGID = () => {
    return process.env.GID === undefined
      ? os.userInfo().gid
      : parseInt(process.env.GID, 10);
  };

  convertVolumes = (volumes?: string[]): Volumes | undefined => {
    if (!volumes) return volumes;
    const convertedVolumes: Volumes = {};
    volumes.forEach(volume => {
      convertedVolumes[volume] = {};
    });
    return convertedVolumes;
  };
}

export const dockerRunner = new DockerRunner();
