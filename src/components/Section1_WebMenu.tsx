import { doDialogFilesAtom } from '@/store';
import { useSetAtom } from 'jotai';
import React, { useState } from 'react';
import { IconMenu } from './UI/UIIcons';

function FileInput({ openFolder }: { openFolder?: boolean; }) {
    const doDialogFiles = useSetAtom(doDialogFilesAtom);
    const doDir = {
        ...(openFolder && { webkitdirectory: '' })
    };
    return (
        <input
            type="file"
            className="hidden1"
            multiple
            {...doDir}
            value=""
            onClick={(e) => {
                //e.target.value = null;
                console.log('-------------e click', e);
            }}
            onChange={(event) => {
                //e.preventDefault();
                if (event.target.files) {
                    doDialogFiles([...event.target.files]);
                    for (const file of event.target.files) {
                        console.log('-------------e change', file);
                    }
                }
            }}
        // onChange={(e) => {
        //     //e.preventDefault();
        //     console.log('-------------e change', e.target.files);
        // }}
        />
    );
}

export function Section1_WebMenu() {
    const [open, setOpen] = useState(true);
    console.log('11111111111');

    return (
        <div className="relative">
            <button onClick={() => setOpen((v) => !v)}>
                <IconMenu className="w-4 h-4 flex-none fill-current" />
            </button>

            {open &&
                <form>
                    <ul className="absolute w-max py-2 text-green-900 bg-green-300 border-neutral-900/50 border rounded grid space-y-1">
                        <li
                            className="mx-1 px-4 py-1 hover:text-green-100 hover:bg-green-700 rounded-sm cursor-pointer"
                            onClick={() => {
                                //setOpen((v) => !v);
                            }}
                        >
                            <label className="cursor-pointer"
                            // onChange={(e) => {
                            //     //e.preventDefault();
                            //     console.log('-------------e change', e);
                            // }}
                            >
                                <FileInput />
                                <div className="">Open File...</div>
                            </label>


                        </li>
                        <li
                            className="mx-1 px-4 py-1 hover:text-green-100 hover:bg-green-700 rounded-sm cursor-pointer"
                            onClick={() => {
                                //setOpen((v) => !v);
                            }}
                        >
                            <label className="cursor-pointer">
                                <FileInput openFolder={true} />
                                <div className="">Open Folder...</div>
                            </label>
                        </li>
                    </ul>
                </form>
            }
        </div>
    );
}
