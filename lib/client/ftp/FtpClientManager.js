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
        this.client = new basic_ftp_1.Client();
        this.options = options;
    }
    connect() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ftpOptions = {
                    host: this.options.host || process.env.SFTP_HOST,
                    user: this.options.username || process.env.SFTP_USER,
                    password: this.options.password || process.env.SFTP_PASS,
                    port: (_a = parseInt(process.env.SFTP_PORT)) !== null && _a !== void 0 ? _a : 22,
                    secure: "implicit"
                };
                //  Enable ftp debug logs
                this.client.ftp.verbose = true;
                // Log progress for any transfer from now on.
                this.client.trackProgress(info => {
                    console.log("File", info.name);
                    console.log("Type", info.type);
                    console.log("Transferred", info.bytes);
                    console.log("Transferred Overall", info.bytesOverall);
                });
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
            const filename = dest.substring(dest.lastIndexOf('/') + 1);
            if (createDir) {
                yield this.createSftpDirs(dest);
            }
            try {
                return yield this.client.uploadFrom(origin, filename);
            }
            catch (e) {
                console.error('error uploading file to sftp', e);
                throw e;
            }
        });
    }
    createSftpDirs(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const normalizedPath = path.substring(0, path.lastIndexOf('/'));
            try {
                console.log('trying to create ftp directory', normalizedPath);
                yield this.client.ensureDir(normalizedPath);
            }
            catch (e) {
                console.error('error creating ftp directory', normalizedPath, e);
            }
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
