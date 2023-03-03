/**
 * Decode mimetype in Base64 string using "Magic Numbers"
 * @ref https://en.wikipedia.org/wiki/Magic_number_(programming)
 * @ref https://stackoverflow.com/questions/57976898/how-to-get-mime-type-from-base-64-string
 * @param base64 Base64 encoded string
 */
export const get_base64_mimetype = (base64: string): string => {
    const signatures = {
        JVBERi0: 'application/pdf',
        iVBORw0KGgo: 'image/png',
        '/9j/': 'image/jpg',
    };
    for (const signaturesKey in signatures) {
        if (base64.indexOf(signaturesKey) == 0) {
            return signatures[signaturesKey as keyof typeof signatures];
        }
    }
    return '';
};

/**
 * Converts mimetype to file extension
 * @param mimetype Decoded mimetype
 */
export const mimetype_to_extension = (mimetype: string): string => {
    const extensions = {
        'application/pdf': 'pdf',
        'image/png': 'png',
        'image/jpg': 'jpg',
        default: '',
    };

    return (
        extensions[mimetype as keyof typeof extensions] ?? extensions.default
    );
};
