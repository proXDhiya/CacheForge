interface ISharedStorage {
    set(key: string, value: any, expiration?: number): void;
    get(key: string): any | undefined;
    find(key: string): boolean;
    delete(key: string): void;
    search(pattern: string): string[];
    getTTL(key: string): number;
    deleteAll(): void;
}

interface IStorage {
    value: any;
    expiredAt?: number;
}

class SharedStorage implements ISharedStorage {
    private storage: Map<string, IStorage>;

    constructor() {
        this.storage = new Map<string, IStorage>();
    }

    public set(key: string, value: any, expiration?: number): void {
        this.storage.set(key, { value, expiredAt: expiration ? Date.now() + expiration : undefined });

        if (expiration) {
            setTimeout(() => {
                this.storage.delete(key);
            }, expiration);
        }
    }

    public get(key: string): any | undefined {
        return this.storage.get(key)?.value;
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

    public getTTL(key: string): number {
        const data = this.storage.get(key);
        if (!data) return -2;
        if (!data.expiredAt) return -1;

        return Math.max(0, Math.ceil((data.expiredAt - Date.now()) / 1000));
    }

    public deleteAll(): void {
        this.storage.clear();
    }
}

export default Object.freeze(new SharedStorage());
