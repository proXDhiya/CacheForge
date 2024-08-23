import ICommand from "./interfaces/command.interface";

const PING = (): ICommand => {
    return {
        type: 'string',
        data: 'PONG',
        isErr: false
    }
}

export default PING;
