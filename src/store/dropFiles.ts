import { atom } from "jotai";
import { hasMain, invokeLoadFiles } from ".";
import { DropItem, electronGetPathes, webGetFilesTransferItems, webLoadFilesContent } from "@/utils";
import { FileContent2 } from "@/electron/app/main-handlers";

export const filesContentAtom = atom<FileContent2[]>([]);

// handle files drop for web and electron environments

export const doDroppedFilesAtom = atom(
    null,
    async (get, set, dataTransfer: DataTransfer) => {
        let filesCnt: FileContent2[];

        if (hasMain()) {
            const dropFiles: File[] = [...dataTransfer.files];
            const filenames = electronGetPathes(dropFiles);
            if (!filenames.length) {
                return;
            }
            filesCnt = await invokeLoadFiles(filenames);
        } else {
            const items: DropItem[] = await webGetFilesTransferItems(dataTransfer.items);
            filesCnt = await webLoadFilesContent(items);
        }

        if (filesCnt) {
            set(filesContentAtom, filesCnt);
        }
    }
);
export type DoDroppedFilesAtom = typeof doDroppedFilesAtom;

//TODO: drop zone 100% of document not view port
//TODO: filter files by valid types
//TODO: show errors in UI
