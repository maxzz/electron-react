import React, { useState } from 'react';
import { atom, useAtomValue } from 'jotai';
import { filesContentAtom } from '@/store';

export function FileDisplay() {
    const filesContent = useAtomValue(filesContentAtom);
    return (
        <>
        <div className="">diplay</div>
        {filesContent.files?.map(({path, cnt}, idx) => {
            return (
                <div className="">{path}</div>
            )
        })}
        </>
    );
}
