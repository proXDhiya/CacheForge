import SharedStorage from "../../storage/SharedStorage";
import ICommand from "../../interfaces/command.interface";
import NUMBER_ARGS from "../errors/numberArgs";
import IRESP from "../../protocol/IRESP";

const DEL = (data: IRESP[]): ICommand => {
    if (data.length < 2) return NUMBER_ARGS(data);

    const keys = data.slice(1).map(key => key.data.toString());
    let deleted = 0;

    keys.map(key => {
        if (SharedStorage.deleteKey(key))
            deleted++;
    });

    return <ICommand>{
        type: 'integer',
        data: deleted
    };
}

export default DEL;
