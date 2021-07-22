import React from 'react';

import { BorderlessButtonProps } from 'react-native-gesture-handler';

import {
    MonthSelectButton,
    MonthSelectIcon
} from './styles';

interface SelectorIconProps extends BorderlessButtonProps{
    icon: string;
}

export function SelectorIcon({ icon, ...rest }: SelectorIconProps) {
    return (
        <MonthSelectButton {...rest}>
            <MonthSelectIcon name={icon}/>
        </MonthSelectButton>
    );
}