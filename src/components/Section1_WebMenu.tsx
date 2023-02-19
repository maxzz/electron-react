import React, { useState } from 'react';
import { IconMenu } from './UI/UIIcons';

export function Section1_WebMenu() {
    const [open, setOpen] = useState(true);
    return (
        <div className="relative">
            <button onClick={() => setOpen((v) => !v)}>
                <IconMenu className="w-4 h-4 flex-none fill-current" />
            </button>

            {open &&
                <ul className="absolute w-max py-2 text-green-900 bg-green-300 border-neutral-900/50 border rounded grid space-y-1">
                    <li
                        className="mx-1 px-4 py-1 hover:text-green-100 hover:bg-green-700 rounded-sm cursor-pointer"
                        onClick={() => {
                            setOpen((v) => !v);
                        }}
                    >
                        <div className="">Open File...</div>
                    </li>
                    <li
                        className="mx-1 px-4 py-1 hover:text-green-100 hover:bg-green-700 rounded-sm cursor-pointer"
                        onClick={() => {
                            setOpen((v) => !v);
                        }}
                    >
                        <div className="">Open Folder...</div>
                    </li>
                </ul>
            }
        </div>
    );
}
