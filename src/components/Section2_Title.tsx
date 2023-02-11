import React from 'react';
import { ReactComponent as ElectronLoad } from '../assets/icons/electron-vite.svg';

export function Section2_Title() {
    return (
        <div className="flex items-center space-x-2">
            <a
                href="https://github.com/electron-vite/electron-vite-react"
                title="Click on the Electron + Vite logo to learn more" target="_blank"
            >
                {/* <img className="w-8 h-8" src="./electron-vite.svg" alt="Electron + Vite logo" /> */}
                <ElectronLoad className="w-16 h-16" />
            </a>

            <div>
                <h1 className="font-semibold">Electron, Vite, React</h1>

                <p className="text-[0.55rem]">
                    Click logo to learn more
                </p>
            </div>
        </div>
    );
}
