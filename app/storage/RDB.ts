interface IRDB {
    set(key: string, value: string): void;
    get(key: string): string | undefined;
}

class RDB implements IRDB {
    private map: Map<string, string> = new Map<string, string>();

    public set(key: string, value: string) {
        this.map.set(key, value);
    }

    public get(key: string): string | undefined {
        return this.map.get(key);
    }
}

export default Object.freeze(new RDB());
