import SharedStorage from "../../storage/SharedStorage";
import ICommand from "../../interfaces/command.interface";
import NUMBER_ARGS from "../errors/numberArgs";
import IRESP from "../../protocol/IRESP";

const RENAMENX = (data: IRESP[]): ICommand => {
    if (data.length !== 3) return NUMBER_ARGS(data);

    const key = data[1].data.toString();
    const newKey = data[2].data.toString();

    if (!SharedStorage.findKey(key)) {
        return <ICommand>{
            type: 'error',
            data: 'ERR'
        }
    }

    if (SharedStorage.findKey(newKey))
        return <ICommand>{
            type: 'integer',
            data: 0
        }

    SharedStorage.setKey(newKey, SharedStorage.getKey(key));
    SharedStorage.deleteKey(key);

    return <ICommand>{
        type: 'integer',
        data: 1
    }
};

export default RENAMENX;
