/**
 * Encodes a unix time into a 8-byte unsigned long, in little-endian.
 * @param time
 * @returns string
 * @example
 * unixTimeOperations(1713824559637);
 * // => '15 72 E7 07 8F 01 00 00'
 */
const unixTimeEncoder = (time: number): string => {
    let hexString = time.toString(16).padStart(16, '0');
    let byteArray = hexString.match(/.{1,2}/g);
    if (byteArray) byteArray.reverse();
    return byteArray ? byteArray.join('').toUpperCase() : '';
};

/**
 * Decodes an 8-byte unsigned long into a unix time, in little-endian.
 * @param hex
 * @returns number
 * @example
 * unixTimeDecoder('1572E7078F010000');
 * // => 1713824559637
 */
const unixTimeDecoder = (hex: string): number => {
    let byteArray = hex.match(/.{1,2}/g);
    if (byteArray) byteArray.reverse();
    let bigEndianHex = byteArray ? byteArray.join('') : '';
    return parseInt(bigEndianHex, 16);
};

export default {
    unixTimeEncoder,
    unixTimeDecoder
}
