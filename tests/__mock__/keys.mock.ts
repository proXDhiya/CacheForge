import SharedStorage from "../../app/storage/SharedStorage";

export const setupSharedStorage = () => {
    SharedStorage.set("key", "Hello World!");
    SharedStorage.set("REQ_name", "John Doe");
    SharedStorage.set("REQ_country", "USA");
    SharedStorage.set("REQ_age", 25);
};
