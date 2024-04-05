export interface DockerHostConfigType {
    Binds?: Array<string>;
    PortBindings?: Map<string, Array<string>>;
    AutoRemove?: boolean;
    NetworkMode?: string;
}
export interface DockerCreateOptionsType {
    Name?: string;
    Env?: Array<string>;
    HostConfig?: DockerHostConfigType;
    WorkingDir?: string;
    User?: string;
    AttachStdout?: boolean;
}
export interface DockerStartOptionsType {
    id: string;
}
export interface DockerRunCommandType {
    name?: string;
    image: string;
    user?: boolean;
    tag?: string;
    stdout?: string;
    commands: string[];
    volumes?: string[];
    autoRemove?: boolean;
    env?: string[];
    envFile?: string;
    network?: string;
    createOptions?: DockerCreateOptionsType;
    startOptions?: DockerStartOptionsType;
    entryPoint?: string;
    portBindings?: Map<string, Array<string>>;
    ignoreError?: boolean;
}
