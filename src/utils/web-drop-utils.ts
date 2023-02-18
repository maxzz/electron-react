import { M4RInvoke } from "@/electron/app/ipc-main";
import { fileEntryToFile, getAllFileEntries } from "./web-data-transfer-item-list";

type DropItem = {
    name: string;
    fullPath: string;
    entry: FileSystemFileEntry;    // FileSystemEntry from DataTransfer will exist only when loaded from the web drag and drop.
    file: File;                    // File object from async entry.file() call
};

async function webGetFilesTransferItems(dataTransferItemList: DataTransferItemList): Promise<DropItem[]> {
    const entries = await getAllFileEntries(dataTransferItemList);
    let rv: DropItem[] = [];
    try {
        rv = await Promise.all(entries.map(async (entry) => ({
            name: entry.name,
            fullPath: entry.fullPath,
            entry,
            file: await fileEntryToFile(entry),
        })));
    } catch (error) {
        console.error('cannot read from DataTransferItemList', dataTransferItemList);
    }
    return rv;
}

function textFileReader(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        const aborted = () => reject(`File (${file.name}) reading was aborted`);
        reader.onabort = aborted;
        reader.onerror = aborted;
        reader.onload = () => resolve(reader.result?.toString() || '');
        reader.readAsText(file);
    });
}

async function webLoadFilesContent(dropItems: DropItem[]): Promise<M4RInvoke.FileContent[]> {
    const res: M4RInvoke.FileContent[] = [];
    for (const item of dropItems) {
        try {
            if (!item.entry || !item.file) {
                throw new Error('Empty entry or file');
            }
            const cnt = await textFileReader(item.file);
            res.push({
                entry: item.entry,
                file: item.file,
                name: item.name,
                fullPath: item.fullPath,
                cnt,
            });
        } catch (error) {
            res.push({
                entry: item.entry,
                file: item.file,
                name: item.name,
                fullPath: item.fullPath,
                cnt: error instanceof Error ? error.message : JSON.stringify(error),
                failed: true,
            });
        }
    }
    return res;
}

export async function webLoadDataTransferContent(dataTransferItemList: DataTransferItemList): Promise<M4RInvoke.FileContent[]> {
    const items: DropItem[] = await webGetFilesTransferItems(dataTransferItemList);
    return webLoadFilesContent(items);
}

export function electronGetPathes(files: File[]): string[] {
    const filenames = [...files].map((file) => (file as File & { path: string; }).path).filter(Boolean);
    return filenames;
}
