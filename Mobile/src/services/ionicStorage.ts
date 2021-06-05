import { Storage, Drivers } from "@ionic/storage";

let storage: Storage | null = null;

const createStore = (name = "__mydb") => {
    storage = new Storage({
        name,
        driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
    });
    storage.create();
}

const set = async (key: string, value: string | null) => {
    if (storage != null)
        await storage.set(key, value);
}

const get = async (key: string) => {
    if (storage != null) {
        const value = await storage.get(key);
        return value;
    }
    console.log("Storage == null")
    return null;
}

export {
    createStore,
    set,
    get
}