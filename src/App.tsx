import { useState } from 'react';
import nodeLogo from "./assets/node.svg";
import './App.scss';

const electoronVersion = typeof process !== 'undefined' ? process.versions.electron : 'tm:22.1.0';

console.log('[App.tsx]', `Hello world from Electron ${electoronVersion}.`);

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="App bg-green-500">
            <div>
                <a href="https://github.com/electron-vite/electron-vite-react" target="_blank">
                    <img src="./electron-vite.svg" className="logo" alt="Electron + Vite logo" />
                </a>
            </div>
            <h1>Electron + Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Electron + Vite logo to learn more
            </p>
            <div className="flex-center">
                Place static files into the<code>/public</code> folder <img style={{ width: "5em" }} src={nodeLogo} alt="Node logo" />
            </div>
        </div>
    );
}

export default App;
