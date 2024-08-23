import IRESP from './IRESP';

const encode = (obj: IRESP): string => {
    if (obj.isErr)
        return `-${obj.data}\r\n`;

    switch (obj.type) {
        case 'string':
            return `+${obj.data}\r\n`;
        case 'integer':
            return `:${obj.data}\r\n`;
        case 'bulk':
            if (!obj.data) return '$-1\r\n';

            const isItArray = Array.isArray(obj.data);
            const commandNumber = isItArray ? obj.data?.length : !obj.data ? 0 : 1;
            let command = `*${commandNumber}\r\n`;

            if (isItArray) for (const item of obj.data) {
                command += `$${item.length}\r\n${item}\r\n`;
            } else {
                command += `$${obj.data?.length}\r\n${obj.data}\r\n`;
            }

            return command;
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
