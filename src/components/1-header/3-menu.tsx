import React from "react";
import * as Prim from "@radix-ui/react-menubar";
import { CheckIcon, ChevronRightIcon, DotFilledIcon } from "@radix-ui/react-icons";
import { classNames } from "@/utils/classnames";

type MenubarSeparatorProps = Omit<Prim.MenubarSeparatorProps & React.RefAttributes<HTMLDivElement>, "className">;
export function MenubarSeparator({ children, ...rest }: MenubarSeparatorProps) {
    return (
        <Prim.Separator className="my-1 h-px mx-1.5 bg-gray-200 dark:bg-gray-700" {...rest}>
            {children}
        </Prim.Separator>
    );
}

const s1Classes = "px-3 py-1 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-900";
const s4Classes = "text-sm font-medium text-gray-700 dark:text-gray-100";
const s6Classes = "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75";
const s7Classes = "cursor-default radix-disabled:opacity-50 radix-disabled:cursor-not-allowed";

type MenubarTriggerProps = Omit<Prim.MenubarTriggerProps & React.RefAttributes<HTMLButtonElement>, "className">;
export function MenubarTrigger({ children, ...rest }: MenubarTriggerProps) {
    return (
        <Prim.Trigger
            className={classNames(
                s1Classes, "px-4",
                "radix-state-open:bg-gray-100 dark:radix-state-open:bg-gray-900",
                s4Classes,
                s6Classes,
                s7Classes,
            )}
            {...rest}
        >
            {children}
        </Prim.Trigger>
    );
}

type MenubarSubTriggerProps = Omit<Prim.MenubarSubTriggerProps & React.RefAttributes<HTMLDivElement>, "className">;
export function MenubarSubTrigger({ children, ...rest }: MenubarSubTriggerProps) {
    return (
        <Prim.SubTrigger
            className={classNames(
                s1Classes,
                s4Classes,
                s6Classes,
                s7Classes,
            )}
            {...rest}
        >
            <div className="w-full flex justify-between items-center">
                {children}
                <ChevronRightIcon className="ml-4 -mr-1 text-gray-700 dark:text-gray-100 font-medium" />
            </div>
        </Prim.SubTrigger>
    );
}

type MenubarItemProps = Omit<Prim.MenubarItemProps & React.RefAttributes<HTMLDivElement> & { shortcut?: string; }, "className">;
export function MenubarItem({ children, shortcut, ...rest }: MenubarItemProps) {
    return (
        <Prim.Item
            className={classNames(
                "w-full flex items-center justify-between",
                s1Classes,
                s4Classes,
                s6Classes,
                s7Classes,
            )}
            {...rest}
        >
            <div className="w-full flex justify-between items-center">
                {children}
                {shortcut && (
                    <span className="ml-4 text-gray-400 focus:bg-gray-50 dark:text-gray-500 dark:focus:bg-gray-900">
                        {shortcut}
                    </span>
                )}
            </div>
        </Prim.Item>
    );
}

type MenubarCheckboxItemProps = Omit<Prim.MenubarCheckboxItemProps & React.RefAttributes<HTMLDivElement>, "className">;
export function MenubarCheckboxItem({ children, ...rest }: MenubarCheckboxItemProps) {
    return (
        <Prim.CheckboxItem
            className={classNames(
                "w-full flex items-center justify-between",
                s1Classes,
                s4Classes,
                s6Classes,
                s7Classes,
            )}
            {...rest}
        >
            <div className="flex items-center">
                <div className="relative h-3.5 w-3.5 -ml-1">
                    <Prim.ItemIndicator>
                        <CheckIcon className="h-3.5 w-3.5 -ml-0.5 mr-1.5" />
                    </Prim.ItemIndicator>
                </div>
                <div className="ml-1">{children}</div>
            </div>
        </Prim.CheckboxItem>
    );
}

type MenubarRadioItemProps = Omit<Prim.MenubarRadioItemProps & React.RefAttributes<HTMLDivElement>, "className">;
export function MenubarRadioItem({ children, ...rest }: MenubarRadioItemProps) {
    return (
        <Prim.RadioItem
            className={classNames(
                s7Classes,
                "w-full flex items-center justify-between",
                s1Classes,
                s4Classes,
                s6Classes,
            )}
            {...rest}
        >
            <div className="flex items-center">
                <div className="relative h-3.5 w-3.5 -ml-1">
                    <Prim.ItemIndicator>
                        <DotFilledIcon className="absolute inset-0" />
                    </Prim.ItemIndicator>
                </div>
                <div className="ml-1">{children}</div>
            </div>
        </Prim.RadioItem>
    );
}
