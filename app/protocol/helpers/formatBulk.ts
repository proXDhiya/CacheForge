import IRESP from "../IRESP";

const formatBulkString = (data: string | string[] | number | IRESP[]): string => {
    if (!data) return '$-1\r\n';

    if (Array.isArray(data)) {
        return `*${data.length}\r\n` + data.map(item => `$${item.length}\r\n${item}\r\n`).join('');
    }

    return `$${data?.length}\r\n${data}\r\n`;
};

export default formatBulkString;
