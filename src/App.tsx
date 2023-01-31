import { useState } from 'react';
import nodeLogo from "./assets/node.svg";
import './App.scss';

const electoronVersion = typeof process !== 'undefined' ? process.versions.electron : 'tm:22.1.0';

console.log('[App.tsx]', `Hello world from Electron ${electoronVersion}.`);

export function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="h-full grid grid-rows-[auto_1fr_auto]">
            <div className="bg-green-600">Header</div>
            
            <div className="p-4 bg-green-500">

                <div className="flex items-center space-x-2">
                    <a
                        href="https://github.com/electron-vite/electron-vite-react"
                        title="Click on the Electron + Vite logo to learn more" target="_blank"
                    >
                        <img className="w-8 h-8" src="./electron-vite.svg" alt="Electron + Vite logo" />
                    </a>

                    <h1 className="font-semibold">Electron+Vite+React</h1>
                </div>

                <button className="place-self-center px-3 py-2 border-slate-400 border rounded shadow" onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>

                <p className="read-the-docs">
                    Click on the Electron + Vite logo to learn more
                </p>

                <div className="flex items-center">
                    Place static files into the <span className="px-1 font-semibold">/public</span> folder
                    <img className="w-5 h-5 fill-red-500" src={nodeLogo} alt="Node logo" />
                </div>
            </div>
            <div className="bg-green-600">Footer</div>
        </div>
    );
}
