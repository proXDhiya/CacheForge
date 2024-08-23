import ICommand from "../interfaces/command.interface";
import SharedEnv from "../../storage/SharedEnv";
import NUMBER_ARGS from "../errors/numberArgs";
import IRESP from "../../protocol/IRESP";

const CONFIG = (data: IRESP[]): ICommand => {
    if (data.length !== 3)
        return NUMBER_ARGS(data);

    const command = data[1].data.toString();
    const key = data[2].data.toString();
    const value = SharedEnv.getEnv(key);

    if (!value)
        return <ICommand>{
            type: 'error',
            data: 'ERR: Key not found'
        }

    if (/GET/gim.test(command))
        return <ICommand>{
            type: 'bulk',
            data: [key, value]
        }
}

export default CONFIG;
