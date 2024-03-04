"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.STS = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
class STS {
    constructor() {
        this.stsInstance = new aws_sdk_1.default.STS({
            region: process.env.AWS_REGION || 'us-east-1',
        });
    }
    assumeRole(roleArn, sessionName) {
        const params = {
            RoleArn: roleArn,
            RoleSessionName: sessionName || 'Digi-Sts-Role',
        };
        return new Promise((resolve, reject) => {
            this.stsInstance.assumeRole(params, (err, data) => {
                if (err) {
                    console.error('Error assuming role:', roleArn, err);
                    reject(err);
                }
                else {
                    resolve(data.Credentials);
                }
            });
        });
    }
}
exports.STS = STS;
//# sourceMappingURL=STS.js.map