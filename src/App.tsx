import { doDroppedFilesAtom, sendToMain } from './store';
import { WorldToReactListener } from './store/WorldToReactListener';
import { DocumentDrop } from './components/UI/DocumentDrop';
import { Section2_Title } from './components/Section2_Title';
import { FileContentViews } from './components/FileContentViews';
import nodeLogo from "./assets/node.svg";
import './App.scss';

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
                    {/* <TheRest /> */}
                    <FileContentViews />
                </div>
            </div>

            <div className="px-1 py-2 text-xs text-green-900 bg-green-600">Footer</div>
        </div>

        <DocumentDrop doDroppedFilesAtom={doDroppedFilesAtom} />
        <WorldToReactListener />
    </>);
}

function Section2_SendNotification() {
    return (
        <button
            className="place-self-center px-3 py-2 border-neutral-900/20 border rounded shadow active:scale-[.97]"
            onClick={() => {
                //window.sendNotification('My message')
                sendToMain({ type: 'notify', message: 'My secure transfered message. new' });
            }}
        >
            Send notification
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
