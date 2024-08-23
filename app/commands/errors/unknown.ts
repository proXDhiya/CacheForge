import ICommand from "../interfaces/command.interface";
import IRESP from "../../protocol/IRESP";

const UNKNOWN = (data: string | string[] | number | IRESP[]): ICommand => {
    return <ICommand>{
        type: 'error',
        data: `Unknown command '${data}'`
    }
}

export default UNKNOWN;
