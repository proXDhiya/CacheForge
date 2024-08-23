import SharedStorage from "../../storage/SharedStorage";
import ICommand from "../interfaces/command.interface";
import NUMBER_ARGS from "../errors/numberArgs";
import IRESP from "../../protocol/IRESP";

const RENAMENX = (data: IRESP[]): ICommand => {
    if (data.length !== 3) return NUMBER_ARGS(data);

    const key = data[1].data.toString();
    const newKey = data[2].data.toString();

    if (!SharedStorage.find(key)) {
        return <ICommand>{
            type: 'string',
            data: 'ERR',
            isErr: true
        }
    }

    if (SharedStorage.find(newKey))
        return <ICommand>{
            type: 'integer',
            data: 0,
            isErr: false
        }

    SharedStorage.set(newKey, SharedStorage.get(key));
    SharedStorage.delete(key);

    return <ICommand>{
        type: 'integer',
        data: 1,
        isErr: false
    }
};

export default RENAMENX;
