import SharedEnv from "../storage/SharedEnv";
import {subject} from "../workers/worker.observer";

// If there is --dbfilename argument with or without --dir
// RDB worker will be called to load the database
const dbfilename = SharedEnv.getEnv('dbfilename');
const dir = SharedEnv.getEnv('dir');
const path = dbfilename ? dir ? `${dir}/${dbfilename}` : dbfilename : null;

if (path) subject.send('RDB.LOAD', path);
