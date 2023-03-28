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
exports.SqsHelper = void 0;
const aws_sdk_1 = require("aws-sdk");
class SqsHelper {
    constructor() {
        this.runner = new aws_sdk_1.SQS({
            apiVersion: '2012-11-05',
            region: 'us-east-1',
        });
    }
    send(arn, input) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                MessageAttributes: {},
                MessageBody: JSON.stringify(input),
                QueueUrl: arn,
            };
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                this.runner.sendMessage(params, (err, data) => {
                    if (err) {
                        console.error('Sqs send message error...', err);
                        reject(err);
                    }
                    console.log('Sqs send message successfully', data);
                    resolve(data);
                });
            }));
        });
    }
    sendFifo(arn, input, groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                MessageAttributes: {},
                MessageGroupId: groupId,
                MessageBody: JSON.stringify(input),
                QueueUrl: arn,
            };
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                this.runner.sendMessage(params, (err, data) => {
                    if (err) {
                        console.error('Sqs send message error...', err);
                        reject(err);
                    }
                    console.log('Sqs send message successfully', data);
                    resolve(data);
                });
            }));
        });
    }
}
exports.SqsHelper = SqsHelper;
