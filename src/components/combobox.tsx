'use client';
import {
    Button, ComboBox as AriaCombobox,
    type ComboBoxProps as AriaComboboxProps,
    FieldError,
    Input,
    Label, ListBox, ListBoxItem, ListBoxItemProps,
    Popover,
    Text,
} from 'react-aria-components'
import Search from '@material-design-icons/svg/round/search.svg'
import React, {ReactNode} from "react";
import {twMerge} from "tailwind-merge";

export type ComboboxProps<T extends object> = {
    readonly className?: string;
    readonly children: ReactNode | ((item: T) => ReactNode);
} & Omit<AriaComboboxProps<T>, 'children'>;

export default function Combobox<T extends object>(props: ComboboxProps<T>) {
    const {className, children} = props;

    return <AriaCombobox {...props} className={twMerge('', className)}>
        <div className='flex gap-1 px-2 py-1 rounded bg-yellow-200 text-yellow-950'>
            <Search className='fill-current'/>
            <Input className='bg-transparent outline-0 ring-0 border-0 caret-current'/>
        </div>
        <Text slot="description"/>
        <FieldError/>
        <Popover className='bg-stone-50 text-stone-800 p-1 rounded shadow-lg' crossOffset={-36}>
            <ListBox>
                {children}
            </ListBox>
        </Popover>
    </AriaCombobox>
}

export type ItemProps = {
    readonly className?: string;
} & ListBoxItemProps;

export function Item(props: ItemProps) {
    const {className} = props;
    return (
        <ListBoxItem
            {...props}
            className={twMerge('p-1', className)}
        />
    );
}
