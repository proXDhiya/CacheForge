import ICommand from "../interfaces/command.interface";
import IRESP from "../../protocol/IRESP";

const NUMBER_ARGS = (data: IRESP[]): ICommand => {
    return <ICommand>{
        type: 'string',
        data: `ERR wrong number of arguments for '${data[0].data}' command`,
        isErr: true
    }
}

export default NUMBER_ARGS;
