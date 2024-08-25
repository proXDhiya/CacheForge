/**
 * Encodes a string to a hex string with a length prefix.
 * @param str
 * @returns string
 * @example
 * stringEncoder('foobar');
 * // => '06 66 6F 6F 62 61 72'
 */
const stringEncoder = (str: string): string => {
    const length = (str.length + '').padStart(2, '0');
    const encoded = Buffer.from(str).toString('hex');

    return length + encoded;
}

export default stringEncoder;
