import IRESP from './IRESP';

const encode = (obj: IRESP): string => {
    if (obj.isErr) {
        return `-${obj.data}\r\n`;
    }

    switch (obj.type) {
        case 'string':
            return `+${obj.data}\r\n`;
        case 'integer':
            return `:${obj.data}\r\n`;
        case 'bulk':
            return '$-1\r\n';
    }

    throw new Error('Unknown RESP type');
};

const decode = (data: string): IRESP[] => {
    const splitString = data.trim().split('\r\n');

    const commands = splitString.filter((_, index) => index % 2 === 0);
    commands.shift();

    const lengths = splitString.filter((_, index) => index % 2 !== 0);

    return commands.map((command, index) => {
        return {
            data: command,
            type: 'string',
            length: Number(lengths[index].substring(1)),
        };
    })
};

export default {
    encode,
    decode,
};
