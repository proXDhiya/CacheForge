import * as net from "net";

console.log("Logs from your program will appear here!");

const server: net.Server = net.createServer((connection: net.Socket) => {

});

server.listen(6379, "127.0.0.1");
