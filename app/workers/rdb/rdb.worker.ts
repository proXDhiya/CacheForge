import generateRDB from "./utils/generateRDB";
import parseRDB from "./utils/parseRDB";

declare var self: Worker;

self.onmessage = (event: MessageEvent) => {
    const message: string = event.data.signal;
    let result;

    switch (message) {
        case 'RDB.SAVE':
            result = generateRDB(event.data.content);
            postMessage(result);
            break;

        case 'RDB.LOAD':
            result = parseRDB(event.data.content);
            postMessage(result);
            break;
    }
};
