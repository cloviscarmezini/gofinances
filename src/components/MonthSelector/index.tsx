import React from 'react';

import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { SelectorIcon } from './SelectorIcon';

import {
    Container,
    Month
} from './styles';

interface MonthSelectorProps {
    date: Date;
    onChangeDate: (date: Date) => void;
}

export function MonthSelector({ date, onChangeDate }: MonthSelectorProps) {
    
    function handleSelectDate(action: 'next'|'prev') {
        const newDate =  action === 'next' 
        ? addMonths(date, 1)
        : subMonths(date, 1);

        onChangeDate(newDate);
    }

    return (
        <Container>
            <SelectorIcon
                icon="arrow-left"
                onPress={() => handleSelectDate('prev')}
            />
                <Month>
                    { 
                        format(date, 'MMMM, yyyy', {
                            locale: ptBR
                        }) 
                    }
                </Month>
            <SelectorIcon
                icon="arrow-right"
                onPress={() => handleSelectDate('next')}
            />
        </Container>
    );
}