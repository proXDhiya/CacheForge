import unixTimeEncoder from "./unixTimeEncoder";
import stringEncoder from "./stringEncoder";
import fs from "fs";

enum OP_CODES {
    REDIS_WITH_MAGIC_NUMBER = 'REDIS0007',
    REDIS_VERSION = '6.0.16',
    METADATA = 'FA',
    DATA_SECTION = 'FE',
    HASH_INFORMATION_SECTION = 'FB',
    END_OF_FILE_SECTION = 'FF',
}

enum DATA_TYPES {
    STRING = '00',
}

const generateRDB = (data: Map<string, any>): string => {
    const folderPath = process.cwd() + '/dumps';
    const fileName = 'dump.rdb';

    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);

    // this will generate the header
    const header = Buffer.from(OP_CODES.REDIS_WITH_MAGIC_NUMBER).toString('hex');

    // this will generate the metadata section
    const metadata =
        OP_CODES.METADATA +
        Buffer.from('redis-ver').toString('hex') +
        Buffer.from(OP_CODES.REDIS_VERSION).toString('hex');

    // this will generate the data section
    let dataSection = OP_CODES.DATA_SECTION + '00' + OP_CODES.HASH_INFORMATION_SECTION

    // get the encoding size
    dataSection += (data.size + '').padStart(2, '0');
    dataSection += Array.from(data.values())
        .filter((item: any) => item.expiredAt !== undefined)
        .length.toString(16).padStart(2, '0');

    // for each key-value pair, generate the data section
    data.forEach((value, key) => {
        const type = value.type;
        const expiredAt = value.expiredAt;
        const data = value.value;

        let result: string | null = null;
        if (type === 'string') result = DATA_TYPES.STRING;
        else return;

        result += stringEncoder(key);
        result += stringEncoder(data);

        if (expiredAt) result += 'FC' + unixTimeEncoder(expiredAt);
        dataSection += result;
    });

    // this will generate the end of the file section
    dataSection += OP_CODES.END_OF_FILE_SECTION;

    // Temporary CRC64 checksum
    const CRC64CheckSum = '0000000000000000';
    dataSection += CRC64CheckSum;

    const buffer = Buffer.from(header + metadata + dataSection, 'hex');
    fs.writeFileSync(folderPath + '/' + fileName, buffer);

    return `RDB file generated ${fileName}`;
};

export default generateRDB;
