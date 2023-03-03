/**
 * Decode mimetype in Base64 string using "Magic Numbers"
 * @ref https://en.wikipedia.org/wiki/Magic_number_(programming)
 * @ref https://stackoverflow.com/questions/57976898/how-to-get-mime-type-from-base-64-string
 * @param base64 Base64 encoded string
 */
export declare const get_base64_mimetype: (base64: string) => string;
/**
 * Converts mimetype to file extension
 * @param mimetype Decoded mimetype
 */
export declare const mimetype_to_extension: (mimetype: string) => string;
