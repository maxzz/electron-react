import path from 'node:path';
import { readFileSync, statSync } from 'node:fs';

export function loadFilesContent(filenames: string[]): FilesContent {
    console.log('filenames', filenames);

    const files: string[] = [];
    const folders: string[] = [];
    const failed: FileContent[] = [];

    (filenames || []).forEach((filename) => {
        try {
            const st = statSync(filename);
            if (st.isFile()) {
                files.push(filename);
            } else if (st.isDirectory()) {
                folders.push(filename);
            }
        } catch (error) {
            failed.push({
                path: filename,
                cnt: error.message,
            });
        }
    });

    const loaded: FileContent[] = files.map((filename) => {
        const cnt = readFileSync(filename).toString();
        return {
            path: filename,
            cnt,
        };
    });

    return {
        files: loaded,
        failed,
    };
}
