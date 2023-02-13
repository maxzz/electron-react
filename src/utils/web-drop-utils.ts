export type DropItem = {
    name: string;
    fullPath: string;
    isDir?: boolean;
    item: FileSystemEntry;
};

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

export function getFilesAndDirsFromItems(items: DataTransferItem[]) {
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
