import {isNumber} from "node:util";

interface ISharedStorage {
    setKey(key: string, value: any, expiration?: number): void;
    getKey(key: string): any | undefined;
    findKey(key: string): boolean;
    deleteKey(key: string): void;
    search(pattern: string): string[];
    getTTL(key: string): number;
    copyAll(): Map<string, any>;
    deleteAll(): void;
}

interface IStorage {
    value: any;
    type: 'string' | 'number';
    expiredAt?: number;
    createdAt?: number;
}

class SharedStorage implements ISharedStorage {
    private readonly storage: Map<string, IStorage>;

    constructor() {
        this.storage = new Map<string, IStorage>();
    }

    public setKey(key: string, value: any, expiration?: number): void {
        this.storage.set(
            key, {
                value,
                type: !isNaN(Number(value)) ? 'number' : 'string',
                expiredAt: expiration ? Date.now() + expiration : undefined,
                createdAt: Date.now()
            }
        );

        if (expiration) {
            setTimeout(() => {
                this.storage.delete(key);
            }, expiration);
        }
    }

    public getKey(key: string): any | undefined {
        return this.storage.get(key)?.value;
    }

    public findKey(key: string): boolean {
        return this.storage.has(key);
    }

    public deleteKey(key: string): boolean {
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

    public copyAll(): Map<string, any> {
        return new Map(this.storage);
    }

    public deleteAll(): void {
        this.storage.clear();
    }
}

export default Object.freeze(new SharedStorage());
