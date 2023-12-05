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
exports.SQSBaseHandler = void 0;
const RequestInfo_1 = require("./RequestInfo");
class SQSBaseHandler {
    constructor() {
        /**
         * Entry point used by SQS lambda trigger
         * @param event SQS Event
         */
        this.requestHandler = (event) => __awaiter(this, void 0, void 0, function* () {
            console.log('input received', event);
            for (const record of event.Records) {
                console.log('record received', record.body);
                const body = JSON.parse(record.body || '');
                const request = new RequestInfo_1.RequestInfo(body);
                try {
                    yield this.handler(request);
                }
                catch (error) {
                    console.error('sqs execution error', error, record);
                    throw new Error(error);
                }
            }
        });
    }
}
exports.SQSBaseHandler = SQSBaseHandler;
//# sourceMappingURL=SQSBaseHandler.js.map