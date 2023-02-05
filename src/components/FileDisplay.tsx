import React, { useState } from 'react';
import { atom } from 'jotai';
import { UIDropContainer } from './UI/UIDropContainer';

export function FileDisplay() {
    const [activeAtom] = useState(atom(false))
    return (
        <>
            <UIDropContainer
                className="px-4 py-3 text-center bg-slate-700/20 border-slate-400 border rounded shadow"
                activeAtom={activeAtom}
                onDropped={(files: FileList) => {
                    console.log('files', files);

                }}
            >
                drop zone
            </UIDropContainer>
        </>
    );
}
