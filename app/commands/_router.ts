import ICommand from "./interfaces/command.interface";
import UNKNOWN from "./errors/unknown";
import IRESP from "../protocol/IRESP";
import PING from "./PING";
import ECHO from "./ECHO";
import SET from "./SET";
import GET from "./GET";

const router = (commands: IRESP[]): ICommand => {
    if (/ping/gim.test(<string>commands[0].data)) return PING();
    if (/echo/gim.test(<string>commands[0].data)) return ECHO(commands);
    if (/set/gim.test(<string>commands[0].data)) return SET(commands);
    if (/get/gim.test(<string>commands[0].data)) return GET(commands);

    return UNKNOWN(commands[0].data);
}

export default router;
