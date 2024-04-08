/// <reference types="node" />
import Dockerode from 'dockerode';
import { DockerRunCommandType } from './docker.types';
export declare class DockerRunner {
    private dockerode;
    private existingImages;
    constructor();
    run(params: DockerRunCommandType): Promise<any>;
    createContainer(params: DockerRunCommandType): Promise<Dockerode.Container>;
    start(container: Dockerode.Container, wait?: boolean): Promise<void>;
    private pullImage;
    getContainerFile(container: Dockerode.Container, filePath: string): Promise<Buffer>;
    putArchive(container: Dockerode.Container, path: string, data: Buffer): Promise<void>;
    getContainerId(name: string): Promise<string>;
    getActiveContainer(name: string): Promise<Dockerode.Container | null>;
    getUID: () => number;
    getGID: () => number;
}
export declare const dockerRunner: DockerRunner;
