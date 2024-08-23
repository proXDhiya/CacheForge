import ICommand from "./interfaces/command.interface";
import NUMBER_ARGS from "./errors/numberArgs";
import Storage from "../storage/storage";
import IRESP from "../protocol/IRESP";

const SET = (data: IRESP[]): ICommand => {
    if (data.length !== 3)
        return NUMBER_ARGS(data);

    Storage.set(data[1].data.toString(), data[2].data);

    return <ICommand>{
        type: 'string',
        data: 'OK',
        isErr: false
    }
};

export default SET;
