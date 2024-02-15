import React from "react";
import * as Prim from "@radix-ui/react-menubar";
import { CheckIcon, ChevronRightIcon, DotFilledIcon } from "@radix-ui/react-icons";
import { classNames } from "@/utils/classnames";

type MenubarSeparatorProps = Omit<Prim.MenubarSeparatorProps & React.RefAttributes<HTMLDivElement>, "className">;
export function MenubarSeparator({ children, ...rest }: MenubarSeparatorProps) {
    return (
        <Prim.Separator className="mx-1.5 my-1 h-px bg-muted-foreground/50" {...rest}>
            {children}
        </Prim.Separator>
    );
}

const flexClasses = "w-full flex justify-between items-center";

const itemClasses = "\
px-3 py-1 \
text-sm font-medium \
\
text-foreground \
bg-popover \
focus:text-accent-foreground \
hover:bg-accent \
\
focus:outline-none \
focus-visible:ring-1 \
focus-visible:ring-border \
focus-visible:ring-opacity-75 \
\
radix-disabled:opacity-50 \
radix-disabled:cursor-not-allowed \
\
cursor-default";

type MenubarTriggerProps = Omit<Prim.MenubarTriggerProps & React.RefAttributes<HTMLButtonElement>, "className">;
export function MenubarTrigger({ children, ...rest }: MenubarTriggerProps) {
    return (
        <Prim.Trigger className={classNames(itemClasses, "px-4 radix-state-open:bg-accent")} {...rest}>
            {children}
        </Prim.Trigger>
    );
}

type MenubarSubTriggerProps = Omit<Prim.MenubarSubTriggerProps & React.RefAttributes<HTMLDivElement>, "className">;
export function MenubarSubTrigger({ children, ...rest }: MenubarSubTriggerProps) {
    return (
        <Prim.SubTrigger className={classNames(itemClasses,)} {...rest}>
            <div className={flexClasses}>
                {children}
                <ChevronRightIcon className="ml-4 -mr-1 stroke-foreground font-medium" />
            </div>
        </Prim.SubTrigger>
    );
}

type MenubarItemProps = Omit<Prim.MenubarItemProps & React.RefAttributes<HTMLDivElement> & { shortcut?: string; }, "className">;
export function MenubarItem({ children, shortcut, ...rest }: MenubarItemProps) {
    return (
        <Prim.Item className={classNames(itemClasses, flexClasses)} {...rest}>
            <div className={flexClasses}>
                {children}
                {shortcut && (
                    <span className="ml-4 text-foreground">
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
        <Prim.CheckboxItem className={classNames(itemClasses, flexClasses)} {...rest}>
            <div className="flex items-center">
                <div className="relative -ml-1 size-3.5">
                    <Prim.ItemIndicator>
                        <CheckIcon className="-ml-0.5 mr-1.5 size-3.5" />
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
        <Prim.RadioItem className={classNames(itemClasses, flexClasses)} {...rest}>
            <div className="flex items-center">
                <div className="relative -ml-1 size-3.5">
                    <Prim.ItemIndicator>
                        <DotFilledIcon className="absolute inset-0" />
                    </Prim.ItemIndicator>
                </div>
                <div className="ml-1">{children}</div>
            </div>
        </Prim.RadioItem>
    );
}
