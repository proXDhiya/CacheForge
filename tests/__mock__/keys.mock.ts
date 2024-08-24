import SharedStorage from "../../app/storage/SharedStorage";

export const setupSharedStorage = () => {
    SharedStorage.deleteAll();
    SharedStorage.set("key", "Hello World!");
    SharedStorage.set("REQ_name", "John Doe");
    SharedStorage.set("REQ_country", "USA");
    SharedStorage.set("REQ_age", 25);
};

export const setupSharedStorageWithTTL = () => {
    SharedStorage.deleteAll();
    SharedStorage.set("key", "Hello World!", 10000);
    SharedStorage.set("REQ_name", "John Doe", 5000);
    SharedStorage.set("REQ_country", "USA", 5000);
    SharedStorage.set("REQ_age", 25);
};
