"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUtils = void 0;
const lodash_1 = __importDefault(require("lodash"));
class FileUtils {
    /**
     * Decode mimetype in Base64 string using "Magic Numbers"
     * @ref https://en.wikipedia.org/wiki/Magic_number_(programming)
     * @ref https://stackoverflow.com/questions/57976898/how-to-get-mime-type-from-base-64-string
     * @param base64 Base64 encoded string
     */
    static get_base64_mimetype(base64) {
        const signatures = {
            JVBERi0: 'application/pdf',
            iVBORw0KGgo: 'image/png',
            '/9j/': 'image/jpg',
        };
        for (const signaturesKey in signatures) {
            if (base64.indexOf(signaturesKey) == 0) {
                return signatures[signaturesKey];
            }
        }
        return '';
    }
    /**
     * Converts mimetype to file extension
     * @param mimetype Decoded mimetype
     */
    static mimetype_to_extension(mimetype) {
        var _a;
        const extensions = {
            'application/pdf': 'pdf',
            'image/png': 'png',
            'image/jpg': 'jpg',
            default: '',
        };
        return ((_a = extensions[mimetype]) !== null && _a !== void 0 ? _a : extensions.default);
    }
    static generateCSV(csv, data) {
        const lines = csv.split('\n');
        if (lines.length !== 2) {
            throw new Error('CSV is invalid');
        }
        const trail = lines[0];
        const lineData = lines[1];
        const output = [trail];
        function generateLine(data, line) {
            const fields = line.split(',');
            let outputLine = '';
            for (const field of fields) {
                const value = lodash_1.default.get(data, field, '');
                const trimmedValued = typeof value === 'string' ? value.trim() : value;
                outputLine += trimmedValued + ',';
            }
            return outputLine.substring(0, outputLine.length - 1);
        }
        if (Array.isArray(data)) {
            for (const _data of data) {
                output.push(generateLine(_data, lineData));
            }
        }
        else {
            output.push(generateLine(data, lineData));
        }
        return output.join('\n');
    }
}
exports.FileUtils = FileUtils;
//# sourceMappingURL=FileUtils.js.map