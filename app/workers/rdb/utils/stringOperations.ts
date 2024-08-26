/**
 * Encodes a string to a hex string with a length prefix.
 * @param str
 * @returns string
 * @example
 * stringOperations('foobar');
 * // => '06 66 6F 6F 62 61 72'
 */
const stringEncoder = (str: string): string => {
    const length = (str.length + '').padStart(2, '0');
    const encoded = Buffer.from(str).toString('hex');

    return length + encoded;
}

/**
 * Decodes a hex string with a length prefix to a string.
 * @param hex
 * @returns string
 * @example
 * stringOperations('06 66 6F 6F 62 61 72');
 * // => 'foobar'
 */
const stringDecoder = (hex: string): string => {
    return Buffer.from(hex.slice(2), 'hex').toString();
}

export default {
    stringEncoder,
    stringDecoder
};
