export const DBConfig = {
    name: 'SJDB',
    version: 1,
    objectStoresMeta: [
        {
            store: 'item',
            storeConfig: { keyPath: 'id', autoIncrement: true },
            storeSchema: [
                { name: 'title', keypath: 'title', options: { unique: false } },
                { name: 'parentId', keypath: 'parentId', options: { unique: false } },
                { name: 'index', keypath: 'index', options: { unique: false } }
            ]
        }
    ]
};