import ICommand from "../interfaces/command.interface";
import NUMBER_ARGS from "../errors/numberArgs";
import IRESP from "../../protocol/IRESP";
import RDB from "../../storage/RDB";

const CONFIG = (data: IRESP[]): ICommand => {
    if (data.length !== 3)
        return NUMBER_ARGS(data);

    const command = data[1].data.toString();
    const key = data[2].data.toString();

    if (/GET/gim.test(command))
        return <ICommand>{
            type: 'bulk',
            data: [key, RDB.get(key)],
            isErr: false
        }
}

export default CONFIG;
