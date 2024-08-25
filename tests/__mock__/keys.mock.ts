import SharedStorage from "../../app/storage/SharedStorage";

export const setupSharedStorage = () => {
    SharedStorage.deleteAll();
    SharedStorage.setKey("key", "Hello World!");
    SharedStorage.setKey("REQ_name", "John Doe");
    SharedStorage.setKey("REQ_country", "USA");
    SharedStorage.setKey("REQ_age", 25);
};

export const setupSharedStorageWithTTL = () => {
    SharedStorage.deleteAll();
    SharedStorage.setKey("key", "Hello World!", 10000);
    SharedStorage.setKey("REQ_name", "John Doe", 5000);
    SharedStorage.setKey("REQ_country", "USA", 5000);
    SharedStorage.setKey("REQ_age", 25);
};
