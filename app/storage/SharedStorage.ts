interface ISharedStorage {
    set(key: string, value: any, expiration?: number): void;
    get(key: string): any | undefined;
    find(key: string): boolean;
    delete(key: string): void;
    search(pattern: string): string[];
    deleteAll(): void;
}

class SharedStorage implements ISharedStorage {
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

    public find(key: string): boolean {
        return this.storage.has(key);
    }

    public delete(key: string): boolean {
        return this.storage.delete(key);
    }

    public search(pattern: string): string[] {
        const keys = Array.from(this.storage.keys());
        const regexPattern = pattern.replace(/\*/g, '.*');
        const regex = new RegExp(`^${regexPattern}$`, 'i');
        return keys.filter(key => regex.test(key));
    }

    public deleteAll(): void {
        this.storage.clear();
    }
}

export default Object.freeze(new SharedStorage());
