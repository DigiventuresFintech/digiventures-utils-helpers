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
exports.CloudwatchService = void 0;
const client_cloudwatch_logs_1 = require("@aws-sdk/client-cloudwatch-logs");
const client_cloudwatch_1 = require("@aws-sdk/client-cloudwatch");
class CloudwatchService {
    constructor() {
        this.region = 'us-east-1';
        this.client = new client_cloudwatch_logs_1.CloudWatchLogsClient({
            region: process.env.AWS_REGION || this.region,
        });
        this.metricsClient = new client_cloudwatch_1.CloudWatchClient({
            region: process.env.AWS_REGION || this.region,
        });
    }
    putLog(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.send(new client_cloudwatch_logs_1.CreateLogStreamCommand({
                    logGroupName: input.logGroupName,
                    logStreamName: input.logStreamName,
                }));
            }
            catch (error) { }
            const command = new client_cloudwatch_logs_1.PutLogEventsCommand(input);
            try {
                return yield this.client.send(command);
            }
            catch (error) {
                throw error;
            }
        });
    }
    putFlowsMetric(value, metricName, flowName, unit) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                MetricData: [
                    {
                        MetricName: metricName,
                        Dimensions: [
                            {
                                Name: 'Flows',
                                Value: flowName,
                            },
                        ],
                        Timestamp: new Date(),
                        Unit: unit || 'Milliseconds',
                        Value: value,
                    },
                ],
                Namespace: 'FlowsMetrics',
            };
            const command = new client_cloudwatch_1.PutMetricDataCommand(params);
            try {
                return yield this.metricsClient.send(command);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.CloudwatchService = CloudwatchService;
//# sourceMappingURL=CloudwatchService.js.map