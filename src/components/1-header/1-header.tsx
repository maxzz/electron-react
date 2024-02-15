// import { Section1_WebMenu } from './Section1_WebMenu';
import { ThemeSwitch } from '../ui/shadcn';
import { Menubar } from './2-web-menu';

export function Section1_Header() {
    return (
        <div className="px-2 py-2 text-xs text-green-900 bg-green-600 flex items-center justify-between">
            <Menubar />

            <div className="">
                <ThemeSwitch />
            </div>
        </div>
    );
}
