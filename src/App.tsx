import { doDroppedFilesAtom } from './store';
import { WorldToReactListener } from './store/WorldToReactListener';
import { DocumentDrop } from './components/UI/DocumentDrop';
import { Section1_Header } from './components/Section1_Header';
import { Section2_Title } from './components/Section2_Title';
import { Section2_SendNotification } from './components/Section2_SendNotification';
import { Section3_Footer } from './components/Section3_Footer';
import { FileContentViews } from './components/FileContentViews';
import { UIToaster } from './components/UI/UIToaster';
import './App.scss';

export function App() {
    return (<>
        <div className="h-full grid grid-rows-[auto_1fr_auto]">
            <Section1_Header />

            <div className="grid grid-cols-[1fr_minmax(0,124ch)_1fr] text-green-900 bg-green-500">
                <div className="col-start-2 p-4 flex flex-col space-y-4">
                    <div className=" flex items-center justify-between">
                        <Section2_Title />
                        <Section2_SendNotification />
                    </div>

                    <FileContentViews />
                </div>
            </div>

            <Section3_Footer />
        </div>

        <DocumentDrop doDroppedFilesAtom={doDroppedFilesAtom} />
        <WorldToReactListener />
        <UIToaster />
    </>);
}
