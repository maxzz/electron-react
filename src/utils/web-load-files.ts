export function textFileReader(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        const aborted = () => reject(`File (${file.name}) reading was aborted`);
        reader.onabort = aborted;
        reader.onerror = aborted;
        reader.onload = () => resolve(reader.result?.toString() || '');
        reader.readAsText(file);
    });
}

export async function loadFilesContent(files: File[]): Promise<FilesContent> {
    const res: Required<FilesContent> = {
        files: [],
        failed: [],
    };

    for (const file of files) {
        try {
            const cnt = await textFileReader(file);
            res.files.push({
                file,
                path: file.name,
                cnt,
            });
        } catch (error) {
            res.failed.push({
                file,
                path: file.name,
                cnt: error instanceof Error ? error.message : JSON.stringify(error),
            });
        }
    }

    return res;
}
