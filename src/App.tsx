import { useEffect, useRef, useState } from 'react';
import { doInvokeLoadFilesAtom, mainApi } from './store';
import { DocumentDrop } from './components/UI/DocumentDrop';
import { Section2_Title } from './components/Section2_Title';
import { FileContentViews } from './components/FileContentViews';
import nodeLogo from "./assets/node.svg";
import './App.scss';
import { atom, useAtom } from 'jotai';

export function App() {
    return (<>
        <div className="h-full grid grid-rows-[auto_1fr_auto]">
            <div className="px-1 py-2 text-xs text-green-900 bg-green-600">Header</div>

            <div className="grid grid-cols-[1fr_minmax(0,64ch)_1fr] text-green-900 bg-green-500">
                <div className="col-start-2 p-4 flex flex-col space-y-4">
                    <div className=" flex items-center justify-between">
                        <Section2_Title />
                        <Section2_SendNotification />

                    </div>
                    {/* <TestState /> */}
                    {/* <TheRest /> */}
                    <FileContentViews />
                    <TheDrop />
                </div>
            </div>

            <div className="px-1 py-2 text-xs text-green-900 bg-green-600">Footer</div>
        </div>

        {/* <DocumentDrop doDroppedFilesAtom={doInvokeLoadFilesAtom} /> */}
    </>);
}

function Section2_SendNotification() {
    return (
        <button
            className="place-self-center px-3 py-2 border-neutral-900/20 border rounded shadow active:scale-[.97]"
            onClick={() => {
                //window.sendNotification('My message')
                mainApi?.sendNotification('My secure transfered message');
            }}
        >
            Send notification
        </button>
    );
}

function TestState() {
    const [count, setCount] = useState(0);
    return (
        <button
            className="place-self-center px-3 py-2 border-neutral-400 border rounded shadow active:scale-[.97]"
            onClick={() => setCount((count) => count + 1)}
        >
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

function TheDrop() {
    const filesAtom = useState(atom<string[]>([]))[0];
    const [files, setFiles] = useAtom(filesAtom);
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        inputRef.current?.setAttribute('webkitdirectory', '');
    }, []);
    return (
        <div className="text-xs">
            <input ref={inputRef} type="file" multiple
                onChange={(event) => {
                    const files = event.target.files;
                    if (files) {
                        console.log('input drop', files);

                        // setFiles([...files].map((file) => file.webkitRelativePath))
                        setFiles([...files].map((file) => JSON.stringify(file.name)));
                    }
                }}
            />
            {files.map((file, idx) => (
                <div className="" key={idx}>{file}</div>
            ))}

        </div>
    );
}
