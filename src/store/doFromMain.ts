import { atom } from "jotai";
import { RendererCalls } from "@/electron/main-to-renderer";

export const doFromMainAtom = atom(
    null,
    (get, set, data: any) => {
        const d = data as RendererCalls;
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
