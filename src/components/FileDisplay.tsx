import React, { useState } from 'react';
import { atom, useAtomValue } from 'jotai';
import { filesContentAtom } from '@/store';

export function FileDisplay() {
    const filesContent = useAtomValue(filesContentAtom);
    return (
        <div className="border-slate-900/20 border rounded">
            <div className="px-2 py-2 border-slate-900/20 border-b">Loaded content:</div>

            {filesContent.files?.map(({ path, cnt }, idx) => {
                return (
                    <div className="text-xs" key={idx}>
                        <div className="px-2 py-2 bg-slate-900/20">{path}</div>
                        <div className="px-2 py-2 bg-slate-100/20">{cnt}</div>
                    </div>
                );
            })}
        </div>
    );
}
