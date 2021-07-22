import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import {
    Container,
    Button,
    Icon,
    Title
} from './styles';

const icons = {
    income: 'arrow-up-circle',
    expanse: 'arrow-down-circle'
}

interface TransactionTypeButtonProps extends RectButtonProps{
    title: string;
    type: 'income' | 'expanse';
    isActive: boolean;
}

export function TransactionTypeButton({ title, type, isActive, ...rest }: TransactionTypeButtonProps) {
    return (
        <Container 
            isActive={isActive}
            type={type} 
        >
            <Button {...rest}>
                <Icon name={icons[type]} type={type}/>
                <Title>
                    {title}
                </Title>
            </Button>
        </Container>
    )
}