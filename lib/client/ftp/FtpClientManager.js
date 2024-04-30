"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FtpClientManager = void 0;
const basic_ftp_1 = require("basic-ftp");
class FtpClientManager {
    constructor(options) {
        const timeout = (options === null || options === void 0 ? void 0 : options.timeout)
            ? parseInt(options.timeout)
            : undefined !== null && undefined !== void 0 ? undefined : 60000;
        this.client = new basic_ftp_1.Client(timeout);
        this.options = options;
        this.workingDirectory = '';
        this.client.ftp.verbose = true;
        this.client.trackProgress(info => {
            console.log('File', info.name);
            console.log('Type', info.type);
            console.log('Transferred', info.bytes);
            console.log('Transferred Overall', info.bytesOverall);
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                let ftpOptions = {
                    host: this.options.host || process.env.SFTP_HOST,
                    user: this.options.username || process.env.SFTP_USER,
                    password: this.options.password || process.env.SFTP_PASS,
                    port: this.options.port || parseInt(process.env.SFTP_PORT) || 22,
                    secure: ((_a = this.options) === null || _a === void 0 ? void 0 : _a.secure)
                        ? this.options.secure === 'true'
                        : 'implicit',
                };
                yield this.client.access(ftpOptions);
            }
            catch (e) {
                console.error(`error connecting ftp client ${this.options.host}:${this.options.port}`, e);
                throw e;
            }
            return this.client;
        });
    }
    put(origin, dest, createDir) {
        return __awaiter(this, void 0, void 0, function* () {
            const destFileName = dest.substring(dest.lastIndexOf('/') + 1);
            const destFilePath = dest.substring(0, dest.lastIndexOf('/'));
            if (this.workingDirectory !== destFilePath) {
                if (this.workingDirectory.length > 0) {
                    yield this.client.cd('/');
                }
                this.workingDirectory = yield this.createSftpDirs(destFilePath);
            }
            try {
                return yield this.client.uploadFrom(origin, destFileName);
            }
            catch (e) {
                console.error('error uploading file to sftp', e);
                throw e;
            }
        });
    }
    createSftpDirs(path) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('trying to create ftp directory', path);
                yield this.client.ensureDir(path);
            }
            catch (e) {
                console.error('error creating ftp directory', path, e);
            }
            return path;
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.client) {
                this.client.close();
            }
        });
    }
}
exports.FtpClientManager = FtpClientManager;
//# sourceMappingURL=FtpClientManager.js.map