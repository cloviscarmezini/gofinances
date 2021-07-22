import React from 'react';

import { 
    Container,
    Title,
    Amount,
    Footer,
    Category,
    Icon,
    CategoryName,
    Date
} from './styles';


import { categories } from '../../utils/categories';

export interface TransactionCardDataProps {
    type: 'income' | 'expanse';
    title: string;
    amount: string;
    category: string;
    date: string;
}


interface TransactionCardProps {
    data: TransactionCardDataProps;
}

export function TransactionCard({ data }: TransactionCardProps) {
    const category = categories.find(category=> category.key === data.category);
    
    return (
        <Container>
            <Title>{data.title}</Title>

            <Amount type={data.type}>
                { data.type === 'expanse' && '- ' }
                { data.amount }
            </Amount>

            <Footer>
                <Category>
                    <Icon name={category?.icon}/>
                    <CategoryName>
                        {category?.name}
                    </CategoryName>
                </Category>

                <Date>{data.date}</Date>            
            </Footer>
        </Container>
    );
}