interface ISharedEnv {
    setEnv(key: string, value: string): void;
    getEnv(key: string): string | undefined;
}

class SharedEnv implements ISharedEnv {
    private map: Map<string, string> = new Map<string, string>();

    public setEnv(key: string, value: string) {
        this.map.set(key, value);
    }

    public getEnv(key: string): string | undefined {
        return this.map.get(key);
    }
}

export default Object.freeze(new SharedEnv());
