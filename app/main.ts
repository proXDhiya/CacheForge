import Router from "./commands/_router";
import RESP from "./protocol/RESP";
import * as net from "net";

const server: net.Server = net.createServer((connection: net.Socket) => {
    connection.on("data", (data: Buffer) => {
        const commends = RESP.decode(data.toString());
        const result = Router(commends);
        connection.write(RESP.encode(result));
    });
});

server.listen(6379, "127.0.0.1");
