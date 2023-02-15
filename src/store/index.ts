export * from './dropFiles';

// main process APIs

export var mainApi: TmApi | undefined = typeof tmApi !== 'undefined' ? tmApi : undefined;

// export function sendToMain(data: ToMainCalls) {
//     //mainApi?.setRendererCbToMain((_event: unknown, data: unknown) => worldStore.update(data));
// }
