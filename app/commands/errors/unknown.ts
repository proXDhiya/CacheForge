import ICommand from "../interfaces/command.interface";
import IRESP from "../../protocol/IRESP";

const UNKNOWN = (data: string | number | IRESP[]): ICommand => {
    return {
        type: 'string',
        data: `Unknown command '${data}'`,
        isErr: true
    }
}

export default UNKNOWN;
