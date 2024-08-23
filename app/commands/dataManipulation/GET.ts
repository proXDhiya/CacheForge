import ICommand from "../interfaces/command.interface";
import SharedStorage from "../../storage/SharedStorage";
import NUMBER_ARGS from "../errors/numberArgs";
import IRESP from "../../protocol/IRESP";

const GET = (data: IRESP[]): ICommand => {
    if (data.length !== 2)
        return NUMBER_ARGS(data);

    const value = SharedStorage.get(data[1].data.toString());

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
