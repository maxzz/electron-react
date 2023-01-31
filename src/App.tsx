import { useState } from 'react';
import nodeLogo from "./assets/node.svg";
import './App.scss';

const electoronVersion = typeof process !== 'undefined' ? process.versions.electron : 'tm:22.1.0';

console.log('[App.tsx]', `Hello world from Electron ${electoronVersion}.`);

export function App() {
    return (
        <div className="h-full grid grid-rows-[auto_1fr_auto]">
            <div className="bg-green-600">Header</div>

            <div className="grid grid-cols-[1fr_minmax(0,64ch)_1fr] bg-green-500">
                <div className="col-start-2 p-4 flex flex-col space-y-4">
                    <Header />
                    <TestState />
                    <TheRest />
                </div>
            </div>
            <div className="bg-green-600">Footer</div>
        </div>
    );
}

function Header() {
    return (
        <div className="flex items-center space-x-2">
            <a
                href="https://github.com/electron-vite/electron-vite-react"
                title="Click on the Electron + Vite logo to learn more" target="_blank"
            >
                <img className="w-8 h-8" src="./electron-vite.svg" alt="Electron + Vite logo" />
            </a>
            <h1 className="font-semibold">Electron+Vite+React</h1>
            <p className="pb-4 text-[0.55rem]">
                * Click on the Electron + Vite logo to learn more
            </p>
        </div>
    );
}

function TestState() {
    const [count, setCount] = useState(0);
    return (
        <button className="place-self-center px-3 py-2 border-slate-400 border rounded shadow active:scale-[.97]" onClick={() => setCount((count) => count + 1)}>
            count is {count}
        </button>
    );
}

function TheRest() {
    return (
        <div className="text-xs">
            Place static files into the <span className="font-semibold">/public</span> folder
            <img className="inline-block w-4 h-4 fill-red-500" src={nodeLogo} alt="Node logo" />
        </div>
    );
}
