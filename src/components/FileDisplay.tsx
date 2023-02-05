import React from 'react';

function getDraggedFile(event: React.DragEvent): DataTransferItem | undefined {
    console.log('event.dataTransfer', event.dataTransfer);

    return event.dataTransfer?.items[0];
}

function getDroppedFile(event: React.DragEvent): File | undefined {
    console.log('event.getDroppedFile', event.dataTransfer);

    return event.dataTransfer?.files[0];
}

function fileTypeSupported(item: DataTransferItem | undefined) {
    if (!item) {
        return false;
    }
    console.log('file', item, (item as any).getAsFileSystemHandle(), 'item.getAsFile = ', item.getAsFile());
    return true;
}

export function FileDisplay() {
    return (
        <>
            <div
                className="px-4 py-3 text-center bg-slate-700/20 border-slate-400 border rounded shadow"
                onDragOver={(event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    const file = getDraggedFile(event);
                    if (fileTypeSupported(file)) {

                    }
                }}
                onDrop={(event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    const file = getDroppedFile(event);
                }}
            >
                FileDisplay
            </div>
            
        </>
    );
}
