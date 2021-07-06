import React from 'react';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardDataProps } from '../../components/TransactionCard';

import { 
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGretting,
    UserName,
    Icon,
    HighlightCards,
    Transactions,
    Title,
    TransactionsList
} from './styles';

export interface TransactionCardListProps extends TransactionCardDataProps{
    id: string;
}

export function Dashboard() {
    const transactionCardData: TransactionCardListProps[] = [
        {
            id: '1',
            type: 'positive',
            title: "Desenvolvimento de site",
            amount: "R$ 12.000,00",
            category: {
                name: "vendas",
                icon: "dollar-sign"
            },
            date: "13/04/2020"
        },
        {
            id: '2',
            type: 'positive',
            title: "Imperio marinhi",
            amount: "R$ 2.000,00",
            category: {
                name: "vendas",
                icon: "shopping-bag"
            },
            date: "13/04/2020"
        },
        {
            id: '3',
            type: 'negative',
            title: "Tag",
            amount: "R$ 1.000,00",
            category: {
                name: "vendas",
                icon: "coffee"
            },
            date: "13/04/2020"
        }
    ];

    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo source={{ 
                            uri: 'https://avatars.githubusercontent.com/u/48700098?v=4'
                        }}/>
                        <User>
                            <UserGretting>Olá,</UserGretting>
                            <UserName>Clovão</UserName>
                        </User>
                    </UserInfo>
                    
                    <Icon name="power"/>
                </UserWrapper>
            </Header>

            <HighlightCards>
                <HighlightCard 
                    title="Entradas"
                    amount="R$ 17.450,00"
                    lastTransaction="Última entrada dia 13 de abril"
                    type="income"
                />

                <HighlightCard 
                    title="Saídas"
                    amount="R$ 8.120,40"
                    lastTransaction="Última entrada dia 13 de abril"
                    type="expanse"
                />

                <HighlightCard 
                    title="Total"
                    amount="R$ 9.121,50"
                    lastTransaction="Última entrada dia 13 de abril"
                    type="total"
                />
            </HighlightCards>

            <Transactions>
                    <Title>Listagem</Title>

                    <TransactionsList 
                        data={transactionCardData}
                        keyExtractor={item => item.id}
                        renderItem={({ item })=> <TransactionCard data={item} />}
                    />
            </Transactions>                      
        </Container>
    )
}