import ICommand from "../interfaces/command.interface";
import NUMBER_ARGS from "../errors/numberArgs";
import IRESP from "../../protocol/IRESP";

const ECHO = (data: IRESP[]): ICommand => {
    if (data.length !== 2)
        return NUMBER_ARGS(data);

    return <ICommand>{
        type: 'string',
        data: data[1].data,
        isErr: false
    }
};

export default ECHO;
