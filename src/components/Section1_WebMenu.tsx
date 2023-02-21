import React, { useState } from 'react';
import { useSetAtom } from 'jotai';
import { doDialogFilesAtom } from '@/store';
import { IconMenu } from './UI/UIIcons';
import { toastWarning } from './UI/UIToaster';

function FileInput({ openFolder, onChangeDone }: { openFolder?: boolean; onChangeDone?: () => void; }) {
    const doDialogFiles = useSetAtom(doDialogFilesAtom);
    const doDir = { ...(openFolder && { webkitdirectory: '' }) };
    return (
        <input className="hidden" type="file" multiple {...doDir}
            onChange={(event) => {
                event.target.files && doDialogFiles([...event.target.files]);
                onChangeDone?.();
            }}
        />
    );
}

export function Section1_WebMenu() {
    const [open, setOpen] = useState(false);
    return (
        <div className="relative">
            <button onClick={() => setOpen((v) => !v)}>
                <IconMenu className="w-4 h-4 flex-none fill-current" />
            </button>

            {open &&
                <form>
                    <ul className="absolute w-max py-2 text-green-900 bg-green-300 border-neutral-900/50 border rounded grid space-y-1">

                        <li className="mx-1 px-4 py-1 hover:text-green-100 hover:bg-green-700 rounded-sm cursor-pointer">
                            <label className="cursor-pointer">
                                <FileInput onChangeDone={() => setOpen((v) => !v)} />
                                <div className="">Open File...</div>
                            </label>
                        </li>

                        <li className="mx-1 px-4 py-1 hover:text-green-100 hover:bg-green-700 rounded-sm cursor-pointer">
                            <label className="cursor-pointer">
                                <FileInput onChangeDone={() => setOpen((v) => !v)} openFolder={true} />
                                <div className="">Open Folder...</div>
                            </label>
                        </li>

                        <li className="mx-1 px-4 py-1 hover:text-green-100 hover:bg-green-700 rounded-sm cursor-pointer">
                            <label className="cursor-pointer">
                                <div className=""
                                    onClick={() => {
                                        toastWarning(
                                            <div>
                                                <div className="font-bold">Not implemented</div>
                                                <div className="">yet</div>
                                            </div>,
                                            { style: { backgroundColor: 'tomato' } }
                                        );
                                    }}
                                >
                                    Show message
                                </div>
                            </label>
                        </li>

                    </ul>
                </form>
            }
        </div>
    );
}
