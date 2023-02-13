export type DropItem = {
    name: string;
    fullPath: string;
    isDir?: boolean;
    item: FileSystemEntry;
};
/*
function scanFiles(item: FileSystemEntry, rv: DropItem[]) {
    rv.push({
        name: item.name,
        fullPath: item.fullPath,
        isDir: item.isDirectory,
        item,
    });

    //console.log('item', item);

    if (item.isDirectory) {
        let directoryReader = (item as FileSystemDirectoryEntry).createReader();
        directoryReader.readEntries((entries) => {
            entries.forEach((entry) => {
                scanFiles(entry, rv);
            });
        });
    }
}

export function getFilesAndDirsFromItems(items: DataTransferItem[]): DropItem[] {
    const rv: DropItem[] = [];

    for (let i = 0; i < items.length; i++) {
        let item = items[i].webkitGetAsEntry();

        if (item) {
            scanFiles(item, rv);
        }
    }

    console.log('rv', rv);

    return rv;
}
*/

// Adapted from https://github.com/sanjibnarzary/bodo_music_server/blob/main/resources/assets/js/utils/directoryReader.ts
// Adapted from https://stackoverflow.com/a/53058574
async function readEntriesPromise(directoryReader: FileSystemDirectoryReader): Promise<FileSystemEntry[]> {
    return await new Promise((resolve, reject): void => {
        directoryReader.readEntries(resolve, reject);
    });
}

async function readAllDirectoryEntries(directoryReader: FileSystemDirectoryReader): Promise<FileSystemEntry[]> {
    const entries: FileSystemEntry[] = [];
    let readEntries = await readEntriesPromise(directoryReader);

    while (readEntries.length > 0) {
        entries.push(...readEntries);
        readEntries = await readEntriesPromise(directoryReader);
    }

    return entries;
}

async function getAllFileEntries(dataTransferItemList: DataTransferItemList): Promise<FileSystemEntry[]> {
    const fileEntries: FileSystemEntry[] = [];
    const queue: FileSystemEntry[] = [];

    for (let i = 0, length = dataTransferItemList.length; i < length; i++) {
        queue.push(dataTransferItemList[i].webkitGetAsEntry()!);
    }

    while (queue.length > 0) {
        const entry = queue.shift();

        if (!entry) {
            continue;
        }

        if (entry.isFile) {
            fileEntries.push(entry);
        } else if (entry.isDirectory) {
            queue.push(...await readAllDirectoryEntries((entry as FileSystemDirectoryEntry).createReader()));
        }
    }

    return fileEntries;
}

export async function getFilesAndDirsFromItems(dataTransferItemList: DataTransferItemList): Promise<DropItem[]> {

    const entries = await getAllFileEntries(dataTransferItemList);

    const rv: DropItem[] = entries.map((entry) => ({
        name: entry.name,
        fullPath: entry.fullPath,
        isDir: entry.isDirectory,
        item: entry,
    }));

    return rv;
}
