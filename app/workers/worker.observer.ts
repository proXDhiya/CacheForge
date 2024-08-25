class WorkerObserver {
    private readonly worker: Worker;
    public name: string;

    constructor(name: string, workerScript: string) {
        this.worker = new Worker(workerScript);
        this.name = name;
    }

    public update(signal: string): void {
        this.worker.postMessage(signal);
    }

    public onmessage(callback: (event: MessageEvent) => void): void {
        this.worker.onmessage = callback;
    }

    public terminate(): void {
        this.worker.terminate();
    }
}

class SignalSubject {
    private observers: WorkerObserver[];

    constructor() {
        this.observers = [];
    }

    public attach(observer: WorkerObserver): void {
        this.observers.push(observer);
    }

    public detach(observer: WorkerObserver): void {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    public notify(signal: any): void {
        this.observers.forEach(observer => observer.update(signal));
    }

    public send(signal: string, content: any): void {
        this.notify({signal, content});
    }
}

const subject = Object.freeze(new SignalSubject())

export {
    WorkerObserver,
    subject
}
