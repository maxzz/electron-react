import React from 'react';
import { UiDropContainer } from './UIDropContainer';

export function FileDisplay() {
    return (
        <>
            <UiDropContainer
                className="px-4 py-3 text-center bg-slate-700/20 border-slate-400 border rounded shadow"
                onDropped={(files: FileList) => {
                    console.log('files', files);

                }}
            >
                drop
            </UiDropContainer>
        </>
    );
}
