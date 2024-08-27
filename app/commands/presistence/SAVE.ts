import ICommand from "../../interfaces/command.interface";
import SharedStorage from "../../storage/SharedStorage";
import {subject} from "../../workers/worker.observer";
import SharedEnv from "../../storage/SharedEnv";

const SAVE = (): ICommand => {
    const dbFileName = SharedEnv.getEnv('dbfilename');
    const dbFilePath = SharedEnv.getEnv('dir');
    const map = SharedStorage.copyAll();

    subject.send('RDB.SAVE', {
            map: map,
            path: dbFileName ? dbFilePath ? `${dbFilePath}/${dbFileName}` : dbFileName : undefined
        }
    );

    return <ICommand>{
        type: 'string',
        data: 'OK'
    }
};

export default SAVE;
