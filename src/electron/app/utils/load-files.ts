import path from 'node:path';
import { readFileSync, statSync } from 'node:fs';
import { M4R } from '../ipc-main';

export function loadFilesContent(filenames: string[]): M4R.FileContent2[] {
    const files: Partial<M4R.FileContent2>[] = [];
    const folders: string[] = [];

    (filenames || []).forEach((filename) => {
        try {
            const st = statSync(filename);
            if (st.isFile()) {
                files.push({
                    name: filename,
                });
            } else if (st.isDirectory()) {
                folders.push(filename);
            }
        } catch (error) {
            files.push({
                name: filename,
                cnt: error instanceof Error ? error.message : JSON.stringify(error),
                failed: true,
            });
        }
    });

    //TODO: load folders

    files.forEach((file) => {
        if (!file.failed) {
            try {
                file.cnt = readFileSync(file.name!).toString();
            } catch (error) {
                file.cnt = error instanceof Error ? error.message : JSON.stringify(error);
                file.failed = true;
            }
        }
    });

    return files as Required<M4R.FileContent2>[];
}
