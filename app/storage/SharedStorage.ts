class SharedStorage {
    private storage: Map<string, any>;

    constructor() {
        this.storage = new Map<string, any>();
    }

    public set(key: string, value: any, expiration?: number): void {
        this.storage.set(key, value);

        if (expiration) {
            setTimeout(() => {
                this.storage.delete(key);
            }, expiration);
        }
    }

    public get(key: string): any | undefined {
        return this.storage.get(key);
    }
}

export default Object.freeze(new SharedStorage());
