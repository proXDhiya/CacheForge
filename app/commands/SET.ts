import ICommand from "./interfaces/command.interface";
import NUMBER_ARGS from "./errors/numberArgs";
import Storage from "../storage/storage";
import IRESP from "../protocol/IRESP";

const SET = (data: IRESP[]): ICommand => {
    if (data.length <= 3) return NUMBER_ARGS(data);

    const key = data[1].data.toString();
    const value = data[2].data;
    const isEx = data[3]?.data === 'EX' || data[3]?.data === 'PX';
    const duration = isEx && data[4] && !isNaN(Number(data[4].data))
        ? Number(data[4].data) * (data[3].data === 'EX' ? 1000 : 1)
        : undefined;

    if (isEx && duration === undefined) {
        return {
            type: 'string',
            data: 'ERR',
            isErr: true
        };
    }

    Storage.set(key, value, duration);

    return {
        type: 'string',
        data: 'OK',
        isErr: false
    };
};

export default SET;
