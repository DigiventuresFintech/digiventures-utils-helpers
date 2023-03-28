"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUtils = void 0;
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
}
exports.FileUtils = FileUtils;
