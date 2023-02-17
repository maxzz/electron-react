import { M2R } from "@/electron/app/ipc-main";
import { atom } from "jotai";

export const doFromMainAtom = atom(
    null,
    (get, set, data: any) => {
        const d = data as M2R.RendererCalls;
        switch (d.type) {
            case 'dark-mode': {
                console.log('case dark-mode, active', d.active);
                break;
            }
            case 'reload-files': {
                console.log('reload-files');
                break;
            }
            default: {
                console.log('content', data);
            }
        }
    }
);
