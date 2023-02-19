import React, { useState } from 'react';
import { IconMenu } from './UI/UIIcons';

export function Section1_WebMenu() {
    const [open, setOpen] = useState(true);
    return (
        <div className="relative">
            <button onClick={() => setOpen((v) => !v)}>
                <IconMenu className="w-4 h-4 flex-none fill-current" />
            </button>
            {open && <div className="absolute w-max py-2 text-green-900 bg-green-300 border-neutral-900/50 border rounded flex flex-col items-start space-y-1">
                <button className="mx-1 px-4 py-1 hover:text-green-100 hover:bg-green-700 rounded-sm">Open File...</button>
                <button className="mx-1 px-4 py-1 hover:text-green-100 hover:bg-green-700 rounded-sm">Open Folder...</button>
            </div>}
        </div>
    );
}
