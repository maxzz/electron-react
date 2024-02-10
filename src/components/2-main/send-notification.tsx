import React from 'react';
import { sendToMain } from '@/store';

export function Section2_SendNotification() {
    return (
        <button
            className="place-self-center px-3 py-2 border-neutral-900/20 border rounded shadow active:scale-[.97]"
            onClick={() => {
                sendToMain({ type: 'notify', message: 'My secure transfered message. new' });
            }}
        >
            Send notification
        </button>
    );
}
