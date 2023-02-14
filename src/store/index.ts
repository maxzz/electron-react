export * from './drop-files';

// main process APIs

export var mainApi: TmApi | undefined = typeof tmApi !== 'undefined' ? tmApi : undefined;

console.log('------------');
mainApi?.menuCommand((event: any, data: any) => {
    console.log('content', data);
});
