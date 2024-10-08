import {RDBWorker} from "./config/_setup";

import RESP from "./protocol/RESP";
import Router from "./router";
import * as net from "net";

const server: net.Server = net.createServer((connection: net.Socket) => {
    connection.on("data", (data: Buffer) => {
        const commends = RESP.decode(data.toString());
        const result = Router(commends);
        connection.write(RESP.encode(result));
    });
});

RDBWorker.onmessage((event: MessageEvent) => {
    console.log(`[${new Date().toLocaleTimeString()}] [${RDBWorker.name}] ${event.data}`);
});

server.listen(6379, "127.0.0.1");
