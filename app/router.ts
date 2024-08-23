import ICommand from "./commands/interfaces/command.interface";
import FLUSHALL from "./commands/dataManipulation/FLUSHALL";
import RENAMENX from "./commands/dataManipulation/RENAMENX";
import EXISTS from "./commands/dataManipulation/EXISTS";
import RENAME from "./commands/dataManipulation/RENAME";
import CONFIG from "./commands/configuration/CONFIG";
import KEYS from "./commands/dataManipulation/KEYS";
import COPY from "./commands/dataManipulation/COPY";
import SET from "./commands/dataManipulation/SET";
import GET from "./commands/dataManipulation/GET";
import DEL from "./commands/dataManipulation/DEL";
import TTL from "./commands/dataManipulation/TTL";
import UNKNOWN from "./commands/errors/unknown";
import PING from "./commands/basicUtility/PING";
import ECHO from "./commands/basicUtility/ECHO";
import IRESP from "./protocol/IRESP";

const router = (commands: IRESP[]): ICommand => {
    const command = commands[0].data.toString();

    // Basic commands
    if (/ping$/gim.test(command)) return PING();
    if (/echo$/gim.test(command)) return ECHO(commands);

    // Data manipulation commands
    if (/set$/gim.test(command)) return SET(commands);
    if (/get$/gim.test(command)) return GET(commands);
    if (/del$/gim.test(command)) return DEL(commands);
    if (/ttl$/gim.test(command)) return TTL(commands);
    if (/keys$/gim.test(command)) return KEYS(commands);
    if (/copy$/gim.test(command)) return COPY(commands);
    if (/flushall$/gim.test(command)) return FLUSHALL();
    if (/exists$/gim.test(command)) return EXISTS(commands);
    if (/rename$/gim.test(command)) return RENAME(commands);
    if (/renamenx$/gim.test(command)) return RENAMENX(commands);

    // Configuration commands
    if (/config/gim.test(command)) return CONFIG(commands);

    return UNKNOWN(commands[0].data);
}

export default router;
