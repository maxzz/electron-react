import { fileEntryToFile, getAllFileEntries } from "./web-data-transfer-item-list";

export type DropItem = {
    name: string;
    fullPath: string;
    entry: FileSystemFileEntry;    // FileSystemEntry from DataTransfer will exist only when loaded from the web drag and drop.
    file: File;                    // File object from async entry.file() call
};

export async function webGetFilesTransferItems(dataTransferItemList: DataTransferItemList): Promise<DropItem[]> {
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
