import ICommand from "./interfaces/command.interface";
import IRESP from "../protocol/IRESP";

const ECHO = (data: IRESP[]): ICommand => {
    return <ICommand>{
        type: 'string',
        data: data[1].data,
        isErr: false
    }
};

export default ECHO;
