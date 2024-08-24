import ICommand from "../../interfaces/command.interface";

const PING = (): ICommand => {
    return <ICommand>{
        type: 'string',
        data: 'PONG'
    }
}

export default PING;
