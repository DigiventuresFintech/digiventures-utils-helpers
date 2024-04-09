"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dockerRunner = exports.DockerRunner = void 0;
const dockerode_1 = __importDefault(require("dockerode"));
const stream_1 = __importDefault(require("stream"));
const os = __importStar(require("os"));
class DockerRunner {
    constructor() {
        this.existingImages = {};
        this.getUID = () => {
            return process.env.UID === undefined
                ? os.userInfo().uid
                : parseInt(process.env.UID, 10);
        };
        this.getGID = () => {
            return process.env.GID === undefined
                ? os.userInfo().gid
                : parseInt(process.env.GID, 10);
        };
        this.convertVolumes = (volumes) => {
            if (!volumes)
                return volumes;
            const convertedVolumes = {};
            volumes.forEach(volume => {
                convertedVolumes[volume] = {};
            });
            return convertedVolumes;
        };
        //this.dockerode = new Dockerode({ socketPath: '/var/run/docker.sock' });
        //127.0.0.1:2375
        this.dockerode = new dockerode_1.default();
    }
    setup() {
        this.dockerode
            .version()
            .then(res => console.log(`Use docker version: ${res.Version}`))
            .catch(e => {
            throw new Error(`[x] command [docker]: ${e.message}`);
        });
    }
    run(params) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pullImage(params);
            const { image, tag, commands, ignoreError } = params;
            const createOptions = params.createOptions || {
                AttachStdout: true,
                HostConfig: {
                    AutoRemove: params.autoRemove !== undefined ? params.autoRemove : true,
                    NetworkMode: params.network,
                    Binds: params.volumes,
                },
                User: params.user !== false ? `${this.getUID()}:${this.getGID()}` : '',
            };
            const startOptions = params.startOptions || {};
            try {
                let stdout = '';
                const stdoutStream = new stream_1.default.Writable({
                    write: function (chunk, encoding, callback) {
                        stdout += chunk.toString();
                        callback();
                    },
                });
                yield this.dockerode.run(`${image}:${tag || 'latest'}`, commands, stdoutStream, createOptions, startOptions);
                console.log(`run command output: \n${stdout}`);
                console.log(`docker run\n  image: ${image}\n  commands: ${commands.join(' ')}`);
                return {
                    stdout: stdout.toString(),
                };
            }
            catch (e) {
                throw new Error(`[x] command [docker run]:${e.message}`);
            }
        });
    }
    createContainer(params) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pullImage(params);
            const { image, tag, commands, ignoreError } = params;
            const createOptions = params.createOptions || {
                AttachStdout: true,
                HostConfig: {
                    AutoRemove: params.autoRemove !== undefined ? params.autoRemove : true,
                    NetworkMode: params.network,
                },
                User: params.user !== false ? `${this.getUID()}:${this.getGID()}` : '',
            };
            try {
                return yield this.dockerode.createContainer(Object.assign(Object.assign({ name: params.name, Image: `${image}:${tag || 'latest'}`, Cmd: commands }, createOptions), { Volumes: this.convertVolumes(params.volumes), AttachStderr: true, AttachStdin: false, AttachStdout: true, OpenStdin: false, StdinOnce: false }));
            }
            catch (e) {
                throw new Error(`[x] command [docker create container]:${e}`);
            }
        });
    }
    start(container, wait) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield container.start();
                if (wait) {
                    yield container.wait();
                }
            }
            catch (e) {
                throw new Error(`[x] command [docker run]:${e.message}`);
            }
        });
    }
    pullImage(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const tag = params.tag || 'latest';
            if (!this.existingImages[`${params.image}:${tag}`]) {
                const images = yield this.dockerode.listImages({
                    filters: { reference: [`${params.image}:${tag}`] },
                });
                if (images.length === 0) {
                    yield this.dockerode.pull(`${params.image}:${tag}`, {
                        auth: params.auth,
                    });
                    while (true) {
                        const images = yield this.dockerode.listImages({
                            filters: { reference: [`${params.image}:${tag}`] },
                        });
                        if (images.length !== 0)
                            break;
                        yield new Promise(resolve => setTimeout(resolve, 1000));
                    }
                    this.existingImages[`${params.image}:${tag}`] = true;
                }
            }
        });
    }
    getContainerFile(container, filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                container.getArchive({ path: filePath }, (err, stream) => {
                    if (err || !stream) {
                        return reject(err);
                    }
                    const chunks = [];
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
        });
    }
    putArchive(container, path, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield container.putArchive(data, { path });
            }
            catch (e) {
                throw new Error(`[x] command [docker put archive]:${e}`);
            }
        });
    }
    getContainerId(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const opts = {
                limit: 1,
                filters: { name: [`${name}`] },
            };
            return new Promise((resolve, reject) => {
                this.dockerode.listContainers(opts, (err, containers) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        if ((containers === null || containers === void 0 ? void 0 : containers.length) === 0) {
                            return reject();
                        }
                        resolve(containers[0].Id);
                    }
                });
            });
        });
    }
    getActiveContainer(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const containerId = (yield this.getContainerId(name));
                return this.dockerode.getContainer(containerId);
            }
            catch (e) {
                return null;
            }
        });
    }
}
exports.DockerRunner = DockerRunner;
exports.dockerRunner = new DockerRunner();
//# sourceMappingURL=DockerRunner.js.map