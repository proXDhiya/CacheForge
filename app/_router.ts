import ICommand from "./commands/interfaces/command.interface";
import CONFIG from "./commands/configuration/CONFIG";
import KEYS from "./commands/dataManipulation/KEYS";
import SET from "./commands/dataManipulation/SET";
import GET from "./commands/dataManipulation/GET";
import DEL from "./commands/dataManipulation/DEL";
import UNKNOWN from "./commands/errors/unknown";
import PING from "./commands/basicUtility/PING";
import ECHO from "./commands/basicUtility/ECHO";
import IRESP from "./protocol/IRESP";

const router = (commands: IRESP[]): ICommand => {
    const command = commands[0].data.toString();

    // Basic commands
    if (/ping/gim.test(command)) return PING();
    if (/echo/gim.test(command)) return ECHO(commands);

    // Data manipulation commands
    if (/set/gim.test(command)) return SET(commands);
    if (/get/gim.test(command)) return GET(commands);
    if (/del/gim.test(command)) return DEL(commands);
    if (/keys/gim.test(command)) return KEYS(commands);

    // Configuration commands
    if (/config/gim.test(command)) return CONFIG(commands);

    return UNKNOWN(commands[0].data);
}

export default router;
