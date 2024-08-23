const sharedStorage = new Map<string, any>();

const set = (key: string, value: any, expiration: number | undefined) => {
    sharedStorage.set(key, value);

    if (expiration) setTimeout(() => {
        sharedStorage.delete(key);
    }, expiration - 1);
};

const get = (key: string) => {
    return sharedStorage.get(key);
};

export default {
    set,
    get
}
