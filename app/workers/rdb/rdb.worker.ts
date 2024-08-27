import generateRDB from "./utils/generateRDB";
import parseRDB from "./utils/parseRDB";

declare var self: Worker;

self.onmessage = (event: MessageEvent) => {
    const message: string = event.data.signal;
    let result;

    switch (message) {
        case 'RDB.SAVE':
            const subFileName = event.data.content.path.split('/').pop() || undefined;
            const subFilepath = event.data.content.path.split('/').slice(0, -1).join('/') || undefined;
            result = generateRDB(event.data.content.map, subFilepath, subFileName);
            postMessage(result);
            break;

        case 'RDB.LOAD':
            result = parseRDB(event.data.content);
            postMessage(result);
            break;
    }
};
