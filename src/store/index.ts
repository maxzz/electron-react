import { store } from './ExternalListener';

export * from './drop-files';

// main process APIs

export var mainApi: TmApi | undefined = typeof tmApi !== 'undefined' ? tmApi : undefined;

let num = 5;

console.log('------------');
mainApi?.menuCommand((event: any, data: any) => {
    console.log('content', data);
    store.update(num++, num + 5);
});
