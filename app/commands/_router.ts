import ICommand from "./interfaces/command.interface";
import UNKNOWN from "./errors/unknown";
import IRESP from "../protocol/IRESP";
import PING from "./PING";

const router = (commands: IRESP[]): ICommand => {
    const numberOfCommands = commands.length;

    if (numberOfCommands === 1)
        if (/ping/gim.test(<string>commands[0].data)) return PING();

    return UNKNOWN(commands[0].data);
}

export default router;
