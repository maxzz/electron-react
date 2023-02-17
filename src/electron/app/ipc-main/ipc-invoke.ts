import { M4RInvoke } from ".";
import { loadFilesContent } from "../utils/load-files";

export function invokeFromRendererToMain(d: M4RInvoke.InvokeCalls): any {
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
