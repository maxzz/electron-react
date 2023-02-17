import { atom } from "jotai";
import { invokeLoadFiles, invokeMain, mainApi } from ".";
import { DropItem, electronGetPathes, webGetFilesTransferItems, webLoadFilesContent } from "@/utils";
import { FileContent2 } from "@/electron/app/main-handlers";

// handle files drop for web and electron environments

export const filesContentAtom = atom<FileContent2[]>([]);

export type DoDroppedFilesAtom = typeof doInvokeLoadFilesAtom;

export const doInvokeLoadFilesAtom = atom(
    null,
    async (get, set, dataTransfer: DataTransfer) => {
        let filesCnt: FileContent2[];

        if (mainApi) {
            const dropFiles: File[] = [...dataTransfer.files];
            const filenames = electronGetPathes(dropFiles);
            if (!filenames.length) { return; }

            // filesCnt = await mainApi?.invokeFilesContent(filenames);
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

//TODO: drop zone 100% of document not view port
//TODO: filter files by valid types
//TODO: show errors in UI
