import React, { useState } from 'react';
import { atom } from 'jotai';

export function FileDisplay() {
    const [activeAtom] = useState(atom(false))
    return (
        <>
        <div className="">diplay</div>
        </>
    );
}
