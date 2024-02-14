import { HTMLAttributes } from 'react';

export function SectionHeader({ children, ...rest }: HTMLAttributes<HTMLElement>) {
    return (
        <div className="px-2 py-2 border-border border-b shadow" {...rest}>
            {children}
        </div>
    );
}
