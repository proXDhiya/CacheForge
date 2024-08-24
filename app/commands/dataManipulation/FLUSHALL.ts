import SharedStorage from "../../storage/SharedStorage";
import ICommand from "../../interfaces/command.interface";

const FLUSHALL = (): ICommand => {
    SharedStorage.deleteAll();

    return <ICommand>{
        type: 'string',
        data: 'OK'
    };
}

export default FLUSHALL;
