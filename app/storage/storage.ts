const sharedStorage = new Map<string, any>();

const set = (key: string, value: any) => {
    sharedStorage.set(key, value);
};

const get = (key: string) => {
    return sharedStorage.get(key);
};

export default {
    set,
    get
}
