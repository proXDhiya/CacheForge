import ICommand from "../../interfaces/command.interface";
import SharedStorage from "../../storage/SharedStorage";
import {subject} from "../../workers/worker.observer";

const SAVE = (): ICommand => {
    subject.send('RDB.SAVE', SharedStorage.copyAll());

    return <ICommand>{
        type: 'string',
        data: 'OK'
    }
};

export default SAVE;
