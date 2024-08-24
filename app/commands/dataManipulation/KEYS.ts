import SharedStorage from "../../storage/SharedStorage";
import ICommand from "../../interfaces/command.interface";
import NUMBER_ARGS from "../errors/numberArgs";
import IRESP from "../../protocol/IRESP";

const KEYS = (data: IRESP[]): ICommand => {
    if (data.length < 2) return NUMBER_ARGS(data);

    const keyWord = data[1].data.toString();
    const keysFound = SharedStorage.search(keyWord);

    return <ICommand>{
        type: 'array',
        data: keysFound
    }
};

export default KEYS;
