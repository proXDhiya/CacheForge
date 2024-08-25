import SharedStorage from "../../storage/SharedStorage";
import ICommand from "../../interfaces/command.interface";
import NUMBER_ARGS from "../errors/numberArgs";
import IRESP from "../../protocol/IRESP";

const EXISTS = (data: IRESP[]): ICommand => {
    if (data.length < 2) return NUMBER_ARGS(data);

    const keys = data.slice(1).map(key => key.data.toString());
    let exists = 0;

    keys.map(key => {
        if (SharedStorage.findKey(key))
            exists++;
    });

    return <ICommand>{
        type: 'integer',
        data: exists
    };
}

export default EXISTS;
