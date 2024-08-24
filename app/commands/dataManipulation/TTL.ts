import SharedStorage from "../../storage/SharedStorage";
import ICommand from "../../interfaces/command.interface";
import NUMBER_ARGS from "../errors/numberArgs";
import IRESP from "../../protocol/IRESP";

const TTL = (data: IRESP[]): ICommand => {
    if (data.length !== 2) return NUMBER_ARGS(data);

    const key = data[1].data.toString();
    const ttl = SharedStorage.getTTL(key);

    return <ICommand>{
        type: 'integer',
        data: ttl
    };
};

export default TTL;
