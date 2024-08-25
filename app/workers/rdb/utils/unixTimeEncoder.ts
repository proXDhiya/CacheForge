/**
 * Encodes a unix time into a 8-byte unsigned long, in little-endian.
 * @param time
 * @returns string
 * @example
 * unixTimeEncoder(1713824559637);
 * // => '15 72 E7 07 8F 01 00 00'
 */
const unixTimeEncoder = (time: number): string => {
    return time.toString(16).padStart(16, '0');
};

export default unixTimeEncoder;
