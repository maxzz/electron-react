// declare var tmApi: {
//     sendNotification: (message: string) => void
// }

type TmApi = {
    sendNotification: (message: string) => void;
    startDrag: (filename: string) => void;
}

declare var tmApi: TmApi;

// declare namespace tmApi {
//     function sendNotification(message: string): void;
// }
