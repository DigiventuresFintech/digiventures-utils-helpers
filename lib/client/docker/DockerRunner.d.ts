/// <reference types="node" />
/// <reference types="node" />
import Dockerode from 'dockerode';
import { DockerRunCommandType } from './docker.types';
type Volumes = {
    [volume: string]: {};
};
export declare class DockerRunner {
    private dockerode;
    private existingImages;
    constructor();
    setup(): void;
    run(params: DockerRunCommandType): Promise<any>;
    createContainer(params: DockerRunCommandType): Promise<Dockerode.Container>;
    start(container: Dockerode.Container, wait?: boolean): Promise<void>;
    private pullImage;
    getContainerFile(container: Dockerode.Container, filePath: string): Promise<Buffer>;
    putArchive(container: Dockerode.Container, path: string, data: string | Buffer | NodeJS.ReadableStream): Promise<void>;
    getContainerId(name: string): Promise<string>;
    getActiveContainer(name: string): Promise<Dockerode.Container | null>;
    getFileFromContainerAsBase64(container: Dockerode.Container, filePath: string): Promise<string>;
    getUID: () => number;
    getGID: () => number;
    convertVolumes: (volumes?: string[]) => Volumes | undefined;
}
export declare const dockerRunner: DockerRunner;
export {};
