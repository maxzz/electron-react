import React from 'react';
import { Section1_WebMenu } from './Section1_WebMenu';

export function Section1_Header() {
    return (
        <div className="px-2 py-2 text-xs text-green-900 bg-green-600 flex items-center space-x-2">
            <Section1_WebMenu />
            <div className="">Header</div>
        </div>
    );
}
