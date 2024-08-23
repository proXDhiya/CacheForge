import ICommand from "./commands/interfaces/command.interface";
import UNKNOWN from "./commands/errors/unknown";
import CONFIG from "./commands/CONFIG";
import IRESP from "./protocol/IRESP";
import PING from "./commands/PING";
import ECHO from "./commands/ECHO";
import SET from "./commands/SET";
import GET from "./commands/GET";

const router = (commands: IRESP[]): ICommand => {
    const command = commands[0].data.toString();

    if (/ping/gim.test(command)) return PING();
    if (/echo/gim.test(command)) return ECHO(commands);
    if (/set/gim.test(command)) return SET(commands);
    if (/get/gim.test(command)) return GET(commands);
    if (/config/gim.test(command)) return CONFIG(commands);

    return UNKNOWN(commands[0].data);
}

export default router;
