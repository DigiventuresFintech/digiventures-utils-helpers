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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FtpClientManager = void 0;
const path_1 = require("path");
const ssh2_sftp_client_1 = __importDefault(require("ssh2-sftp-client"));
class FtpClientManager {
    constructor(options) {
        this.sftp = new ssh2_sftp_client_1.default();
        this.options = options;
    }
    connect() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.options.port = (_a = parseInt(process.env.SFTP_PORT)) !== null && _a !== void 0 ? _a : 22;
                yield this.sftp.connect({
                    host: this.options.host || process.env.SFTP_HOST,
                    port: this.options.port,
                    username: this.options.username || process.env.SFTP_USER,
                    password: this.options.password || process.env.SFTP_PASS
                });
            }
            catch (e) {
                console.error(`error connecting ftp client ${this.options.host}:${this.options.port}`, e);
                throw e;
            }
            return this.sftp;
        });
    }
    put(origin, dest, createDir) {
        return __awaiter(this, void 0, void 0, function* () {
            if (createDir) {
                yield this.createSftpDirs(dest);
            }
            try {
                return yield this.sftp.put(origin, dest);
            }
            catch (e) {
                console.error('error uploading file to sftp', e);
                throw e;
            }
        });
    }
    createSftpDirs(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const dirPath = (0, path_1.dirname)(path);
            const dirExists = yield this.sftp.exists(dirPath);
            if (!dirExists) {
                yield this.sftp.mkdir(dirPath, true);
            }
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.sftp) {
                yield this.sftp.end();
            }
        });
    }
}
exports.FtpClientManager = FtpClientManager;
