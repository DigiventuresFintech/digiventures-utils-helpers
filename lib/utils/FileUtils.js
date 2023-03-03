"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mimetype_to_extension = exports.get_base64_mimetype = void 0;
/**
 * Decode mimetype in Base64 string using "Magic Numbers"
 * @ref https://en.wikipedia.org/wiki/Magic_number_(programming)
 * @ref https://stackoverflow.com/questions/57976898/how-to-get-mime-type-from-base-64-string
 * @param base64 Base64 encoded string
 */
const get_base64_mimetype = (base64) => {
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
};
exports.get_base64_mimetype = get_base64_mimetype;
/**
 * Converts mimetype to file extension
 * @param mimetype Decoded mimetype
 */
const mimetype_to_extension = (mimetype) => {
    var _a;
    const extensions = {
        'application/pdf': 'pdf',
        'image/png': 'png',
        'image/jpg': 'jpg',
        default: '',
    };
    return ((_a = extensions[mimetype]) !== null && _a !== void 0 ? _a : extensions.default);
};
exports.mimetype_to_extension = mimetype_to_extension;
