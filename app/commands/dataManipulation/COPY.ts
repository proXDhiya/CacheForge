import SharedStorage from "../../storage/SharedStorage";
import ICommand from "../../interfaces/command.interface";
import NUMBER_ARGS from "../errors/numberArgs";
import IRESP from "../../protocol/IRESP";

const COPY = (data: IRESP[]): ICommand => {
    if (data.length < 3) return NUMBER_ARGS(data);

    const source = data[1].data.toString();
    const destination = data[2].data.toString();
    const replaceFlag = data[3] ? /REPLACE/gim.test(data[3].data.toString()) : false;

    const isDestinationExists = SharedStorage.findKey(destination);
    const value = SharedStorage.getKey(source);

    if ((isDestinationExists && !replaceFlag) || !value)
        return <ICommand>{
            type: 'integer',
            data: 0
        };

    SharedStorage.setKey(destination, value);

    return <ICommand>{
        type: 'integer',
        data: 1
    };
};

export default COPY;
