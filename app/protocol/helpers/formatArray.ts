import IRESP from "../IRESP";

const formatArray = (data: string | string[] | number | IRESP[]): string => {
    if (typeof data !== 'object' || !Array.isArray(data)) {
        throw new Error('data must be an array');
    }

    return `*${data.length}\r\n` + data.map(item => {
        if (typeof item === 'string') return `$${item.length}\r\n${item}\r\n`;
        if (typeof item === 'number') return `:${item}\r\n`;
        throw new Error('Invalid array item type');
    }).join('');
};

export default formatArray;
