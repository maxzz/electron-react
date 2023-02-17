import { IpcMainInvokeEvent } from "electron";
import { M4RInvoke } from ".";
import { loadFilesContent } from "../utils/load-files";

export function invokeFromRenderer(_event: IpcMainInvokeEvent, data: any): any {
    const d = data as M4RInvoke.InvokeCalls;
    switch (d.type) {
        case 'load-files': {
            return loadFilesContent(d.filenames);
            break;
        }
        case 'load-files2': {
            return loadFilesContent(d.filenames);
            break;
        }
        default: {
            const really: never = d;
            throw new Error(really);
        }
    }
}
