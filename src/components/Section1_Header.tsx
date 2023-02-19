import React from 'react';
import { IconMenu } from './UI/UIIcons';

export function Section1_Header() {
    return (
        <div className="px-2 py-2 text-xs text-green-900 bg-green-600 flex items-center space-x-2">
            <IconMenu className="w-4 h-4 flex-none fill-current" />
            <div className="">Header</div>
        </div>
    );
}
