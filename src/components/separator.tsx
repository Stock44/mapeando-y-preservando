'use client';
import React from 'react';
import {useSeparator, type SeparatorProps as AriaSeparatorProps} from 'react-aria';
import {twJoin} from 'tailwind-merge';

export type SeparatorProps = {
    readonly className?: string;
} & AriaSeparatorProps

export default function Separator(props: SeparatorProps) {
    const {className, orientation = 'horizontal'} = props;
    let {separatorProps} = useSeparator(props);

    return (
        <div
            {...separatorProps}
            className={twJoin(
                'bg-stone-300',
                orientation === 'vertical' && 'w-px h-full mx-2',
                orientation === 'horizontal' && 'h-px w-full my-2',
                className
            )}
        />
    );
}
