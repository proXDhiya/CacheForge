import unixTimeOperations from "./unixTimeOperations";
import generateRDB from "./generateRDB";
import fs from "fs";

enum OP_CODES {
    REDIS_WITH_MAGIC_NUMBER = 'REDIS0007',
    METADATA = 'FA',
    DATA_SECTION = 'FE',
    HASH_INFORMATION_SECTION = 'FB',
    END_OF_FILE_SECTION = 'FF',
}

const parseRDB = (filePath: string): Map<string, any> | string => {
    // check if the file exists
    if (!fs.existsSync(filePath)) {
        const subFileName = filePath.split('/').pop() || undefined;
        const subFilepath = filePath.split('/').slice(0, -1).join('/') || undefined;
        return generateRDB(new Map<string, any>(), subFilepath, subFileName);
    }

    const dataBuffer = fs.readFileSync(filePath);
    const dataHex = dataBuffer.toString('hex');

    let cursor = 0;

    // Update cursor after reading magic number
    const magicNumberHex = Buffer.from(OP_CODES.REDIS_WITH_MAGIC_NUMBER).toString('hex');
    const magicNumberIndex = dataHex.indexOf(magicNumberHex);

    if (magicNumberIndex === -1) throw new Error('Invalid RDB file');
    cursor = magicNumberIndex + magicNumberHex.length;

    // Update cursor after reading metadata
    // The metadata start with FA and end with FE
    // 'FA' and 'FE' are already in hex
    const metadataStartHex = OP_CODES.METADATA.toLowerCase();
    const metadataEndHex = OP_CODES.DATA_SECTION.toLowerCase();
    const metadataStartIndex = dataHex.indexOf(metadataStartHex, cursor);
    const metadataEndIndex = dataHex.indexOf(metadataEndHex, metadataStartIndex);

    if (metadataStartIndex === -1 || metadataEndIndex === -1) throw new Error('Invalid RDB file');
    cursor = metadataEndIndex + metadataEndHex.length;

    // Read data section
    // For now, Ignore the index of the database (2 hex characters)
    cursor += 2;

    // check of start of hash table size (2 hex characters) 'FB'
    const hashTableSizeHex = OP_CODES.HASH_INFORMATION_SECTION.toLowerCase();
    const hashTableSizeIndex = dataHex.indexOf(hashTableSizeHex, cursor);

    if (hashTableSizeIndex === -1) throw new Error('Invalid RDB file');
    cursor = hashTableSizeIndex + hashTableSizeHex.length;

    // Read hash table size
    // First 2 hex characters are the size of the hash table store keys and values
    const hashTableSize = parseInt(dataHex.slice(cursor, cursor + 2), 16);
    cursor += 2;

    // Second 2 hex characters are the size of the hash table store expiration time
    cursor += 2;

    // Initialize the Map to store keys and values
    const keysAndValues = new Map<string, any>();

    for (let i = 0; i < hashTableSize; i++) {
        // First two hex characters are the type of the data
        const dataType = dataHex.slice(cursor, cursor + 2);
        cursor += 2;

        // Next two hex characters are the length of the key
        const keyLength = parseInt(dataHex.slice(cursor, cursor + 2), 16);
        cursor += 2;

        // Next keyLength hex characters are the key
        const key = Buffer.from(dataHex.slice(cursor, cursor + keyLength * 2), 'hex').toString();
        cursor += keyLength * 2;

        // Next two hex characters are the length of the value in reality they are base 10
        const valueLength = parseInt(dataHex.slice(cursor, cursor + 2), 10);
        cursor += 2;

        // Next valueLength hex characters are the value
        const value = Buffer.from(dataHex.slice(cursor, cursor + valueLength * 2), 'hex').toString();
        cursor += valueLength * 2;

        // If next two hex characters are 'FC' or 'FD', then it is an expiration time
        // 'FC' is in milliseconds and 'FD' is in seconds
        // 'FC' is 16 hex characters
        // 'FD' is 8 hex characters
        let expiredAt = null;
        const expirationType = dataHex.slice(cursor, cursor + 2);
        if (/FC|FD/gim.test(expirationType)) {
            cursor += 2;
            const expirationTimeLength = /FC/gim.test(expirationType) ? 16 : 8;
            expiredAt = unixTimeOperations.unixTimeDecoder(dataHex.slice(cursor, cursor + expirationTimeLength));
            cursor += expirationTimeLength;
        }

        // Store key and value in the Map
        keysAndValues.set(key, {
            value,
            expiredAt
        });
    }

    // Update cursor after reading data section
    const endOfFileHex = OP_CODES.END_OF_FILE_SECTION.toLowerCase();
    const endOfFileIndex = dataHex.indexOf(endOfFileHex, cursor);

    if (endOfFileIndex === -1) throw new Error('Invalid RDB file');

    return keysAndValues;
};

export default parseRDB;
