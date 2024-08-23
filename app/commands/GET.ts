import ICommand from "./interfaces/command.interface";
import NUMBER_ARGS from "./errors/numberArgs";
import Storage from "../storage/storage";
import IRESP from "../protocol/IRESP";

const GET = (data: IRESP[]): ICommand => {
    if (data.length !== 2)
        return NUMBER_ARGS(data);

    const value = Storage.get(data[1].data.toString());

    if (!value) return <ICommand>{
        type: 'bulk',
    }

    return <ICommand>{
        type: 'string',
        data: value,
        isErr: false
    }
}

export default GET;
