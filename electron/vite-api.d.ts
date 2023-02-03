// declare var tmApi: {
//     sendNotification: (message: string) => void
// }

declare namespace tmApi {
    interface DialogOptions {
        type?: string;
        title?: string;
        message: string;
        detail?: string;
        textConfirm?: string;
        textCancel?: string;
        checkboxLabel?: string;
        checkboxChecked?: boolean;
    }
    
    function sendNotification(message: string): void;
    function confirm(option: DialogOptions | string): Promise<void>;
}
