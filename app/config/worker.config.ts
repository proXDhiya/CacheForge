import {WorkerObserver, subject} from "../workers/worker.observer";

const rdbUrl = new URL('../workers/rdb/rdb.worker.ts', import.meta.url).pathname;
const RDBWorker = new WorkerObserver('RDBWorker', rdbUrl);
subject.attach(RDBWorker);

export {RDBWorker}
