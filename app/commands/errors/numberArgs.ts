import ICommand from "../../interfaces/command.interface";
import IRESP from "../../protocol/IRESP";

const NUMBER_ARGS = (data: IRESP[]): ICommand => {
    return <ICommand>{
        type: 'error',
        data: `ERR wrong number of arguments for '${data[0].data}' command`
    }
}

export default NUMBER_ARGS;
