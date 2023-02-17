import { IpcMainEvent, Notification } from "electron";
import { M4R } from ".";

export function callFromRendererToMain(_event: IpcMainEvent, data: any) {
    const d = data as M4R.ToMainCalls;
    switch (d.type) {
        case 'notify': {
            new Notification({ title: 'My Noti', body: d.message }).show();
            break;
        }
        case 'dark-mode': {
            d.active;
            break;
        }
        default: {
            const really: never = d;
            throw new Error(really);
        }
    }
}
