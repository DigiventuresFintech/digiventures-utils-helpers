export declare class RestUtils {
    /**
     * Gets public file by url as arraybuffer
     * @param document File to load
     */
    getBase64File(document: string): Promise<any>;
    /**
     * Gets a public file by url and convert it into a base64 string
     * @param document File to load
     */
    getBase64FileAsString(document: string): Promise<string>;
    /**
     * Get mimetype based on end of string
     * @param file
     */
    getFileMimetype(file: string): string;
    /**
     * Get mimetype by extension
     * @param extension
     */
    getMimetype(extension: string): string;
}
