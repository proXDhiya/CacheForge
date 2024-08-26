import {subject} from "../workers/worker.observer";
import SharedEnv from '../storage/SharedEnv';

const args = process.argv.slice(2);

if (args.length % 2 !== 0) {
    console.error('Invalid number of arguments, could not parse key-value pairs');
    process.exit(1);
}

for (let i = 0; i < args.length; i += 2)
    SharedEnv.setEnv(args[i].substring(2), args[i + 1]);

// If there is --dbfilename argument with or without --dir
// RDB worker will be called to load the database
const dbfilename = SharedEnv.getEnv('dbfilename');
const dir = SharedEnv.getEnv('dir');
const path = dbfilename ? dir ? `${dir}/${dbfilename}` : dbfilename : null;

if (path) subject.send('RDB.LOAD', path);
