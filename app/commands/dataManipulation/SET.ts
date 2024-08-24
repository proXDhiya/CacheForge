import SharedStorage from "../../storage/SharedStorage";
import ICommand from "../../interfaces/command.interface";
import NUMBER_ARGS from "../errors/numberArgs";
import IRESP from "../../protocol/IRESP";

const SET = (data: IRESP[]): ICommand => {
    if (data.length < 3) return NUMBER_ARGS(data);

    const key = data[1].data.toString();
    const value = data[2].data;
    const isExOrPx = data[3] && /EX|PX/gim.test(<string>data[3].data);

    if (!isExOrPx && data.length > 3) return <ICommand>{
        type: 'error',
        data: 'ERR'
    };

    const duration = isExOrPx && data[4] && !isNaN(Number(data[4].data))
        ? Number(data[4].data) * (/EX/gim.test(<string>data[3].data) ? 1000 : 1)
        : undefined;

    if (isExOrPx && duration === undefined)
        return <ICommand>{
            type: 'error',
            data: 'ERR'
        };

    SharedStorage.set(key, value, duration);

    return <ICommand>{
        type: 'string',
        data: 'OK'
    };
};

export default SET;
