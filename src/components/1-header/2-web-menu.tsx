import React from "react";
import * as Prim from "@radix-ui/react-menubar";
import { MenubarTrigger, MenubarItem, MenubarSeparator, MenubarSubTrigger, MenubarCheckboxItem, MenubarRadioItem } from "./3-menu";

const RADIO_ITEMS = ["rauchg", "steventey", "0xca0a"];
const CHECK_ITEMS = ["Always Show Bookmarks Bar", "Always Show Full URLs"];

export const Menubar = () => {
    const [checkedSelection, setCheckedSelection] = React.useState([CHECK_ITEMS[1],]);
    const [radioSelection, setRadioSelection] = React.useState(RADIO_ITEMS[2]);

    const contentClasses = "bg-popover rounded p-1";

    return (
        <Prim.Root className="relative flex flex-row rounded select-none -space-x-1">
            <Prim.Menu>
                <MenubarTrigger>File</MenubarTrigger>
                <Prim.Portal>
                    <Prim.Content className={contentClasses} align="start" sideOffset={3} alignOffset={0}>
                        <MenubarItem shortcut="⌘ T">New Tab</MenubarItem>
                        <MenubarItem shortcut="⌘ N">New Window</MenubarItem>
                        <MenubarItem disabled>New Incognito Window</MenubarItem>
                        <MenubarSeparator />
                        <Prim.Sub>
                            <MenubarSubTrigger>Share</MenubarSubTrigger>
                            <Prim.Portal>
                                <Prim.SubContent className={contentClasses} sideOffset={0} alignOffset={-4}>
                                    <MenubarItem>Email Link</MenubarItem>
                                    <MenubarItem>Messages</MenubarItem>
                                    <MenubarItem>Notes</MenubarItem>
                                </Prim.SubContent>
                            </Prim.Portal>
                        </Prim.Sub>

                        <MenubarSeparator />
                        <MenubarItem shortcut="⌘ P">Print…</MenubarItem>
                    </Prim.Content>
                </Prim.Portal>
            </Prim.Menu>

            <Prim.Menu>
                <MenubarTrigger>Edit</MenubarTrigger>
                <Prim.Portal>
                    <Prim.Content className={contentClasses} align="start" sideOffset={3} alignOffset={0}>
                        <MenubarItem shortcut="⌘ Z">Undo</MenubarItem>
                        <MenubarItem shortcut="⇧ ⌘ Z">Redo</MenubarItem>
                        <MenubarSeparator />
                        <Prim.Sub>
                            <MenubarSubTrigger>Find</MenubarSubTrigger>

                            <Prim.Portal>
                                <Prim.SubContent className={contentClasses} sideOffset={0} alignOffset={-4}>
                                    <MenubarItem>Search the web…</MenubarItem>

                                    <MenubarSeparator />
                                    <MenubarItem>Find…</MenubarItem>
                                    <MenubarItem>Find Next</MenubarItem>
                                    <MenubarItem>Find Previous</MenubarItem>
                                </Prim.SubContent>
                            </Prim.Portal>
                        </Prim.Sub>
                        <MenubarSeparator />
                        <MenubarItem>Cut</MenubarItem>
                        <MenubarItem>Copy</MenubarItem>
                        <MenubarItem>Paste</MenubarItem>
                    </Prim.Content>
                </Prim.Portal>
            </Prim.Menu>

            <Prim.Menu>
                <MenubarTrigger>View</MenubarTrigger>
                <Prim.Portal>
                    <Prim.Content className={contentClasses} align="start" sideOffset={3} alignOffset={-14}>
                        {CHECK_ITEMS.map((item) => (
                            <MenubarCheckboxItem
                                key={item}
                                checked={checkedSelection.includes(item)}
                                onCheckedChange={() =>
                                    setCheckedSelection((current) =>
                                        current.includes(item)
                                            ? current.filter((el) => el !== item)
                                            : current.concat(item)
                                    )
                                }
                            >
                                {item}
                            </MenubarCheckboxItem>
                        ))}

                        <MenubarSeparator />
                        <MenubarItem shortcut="⌘ R">Reload</MenubarItem>
                        <MenubarItem shortcut="⇧ ⌘ R">Force Reload</MenubarItem>

                        <MenubarSeparator />
                        <MenubarItem>Toggle Fullscreen</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Hide Sidebar</MenubarItem>
                    </Prim.Content>
                </Prim.Portal>
            </Prim.Menu>

            <Prim.Menu>
                <MenubarTrigger>Profiles</MenubarTrigger>
                <Prim.Portal>
                    <Prim.Content className={contentClasses} align="start" sideOffset={3} alignOffset={-14}>
                        <Prim.RadioGroup value={radioSelection} onValueChange={setRadioSelection}>
                            
                            {RADIO_ITEMS.map((item) => (
                                <MenubarRadioItem key={item} value={item}>
                                    {item}
                                </MenubarRadioItem>
                            ))}

                            <MenubarSeparator />
                            <MenubarItem>Edit…</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>Add Profile…</MenubarItem>
                        </Prim.RadioGroup>
                    </Prim.Content>
                </Prim.Portal>
            </Prim.Menu>
        </Prim.Root>
    );
};
