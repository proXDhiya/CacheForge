import generateRDB from "./utils/generateRDB";
declare var self: Worker;

self.onmessage = (event: MessageEvent) => {
    const message: string = event.data.signal;

    switch (message) {
        case 'RDB.SAVE':
            const result = generateRDB(event.data.content);
            postMessage(result);
            break;
    }
};
