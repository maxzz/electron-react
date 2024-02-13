import { doDroppedFilesAtom } from './store';
import { WorldToReactListener } from './store/ipc-react-listener';
import { DropItDoc, UIToaster } from './components/ui';
import { Section1_Header } from './components/1-header';
import { Section2_Title, Section2_SendNotification, DroppedFilesView } from './components/2-main';
import { Section3_Footer } from './components/3-footer';

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

                    <DroppedFilesView />
                </div>
            </div>

            <Section3_Footer />
        </div>

        <DropItDoc doDroppedFilesAtom={doDroppedFilesAtom} />
        <WorldToReactListener />
        <UIToaster />
    </>);
}
