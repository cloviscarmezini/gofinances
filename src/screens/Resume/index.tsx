import React, { useCallback, useState } from 'react';

import { 
    Container,
    Content,
    ChartContainer,
    MonthSelectorContainer
} from './styles';

import { Header } from '../../components/Header';
import { HistoryCard } from '../../components/HistoryCard';

import { categories } from '../../utils/categories';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import { MonthSelector } from '../../components/MonthSelector';
import { Loader } from '../../components/Loader';

interface TransactionProps {
    type: 'income' | 'expanse';
    title: string;
    amount: string;
    category: string;
    date: string;
}

interface CategoryProps {
    key: string;
    name: string;
    color: string;
    amount: number;
    formatedAmount: string;
    percent: string;
}

export function Resume() {
    const [categoriesTotal, setCategoriesTotal] = useState<CategoryProps[]>([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(true);

    async function getTransactions() {
        const dataKey = '@gofinances:transactions';

        try {
            const transactionsData = await AsyncStorage.getItem(dataKey);

            return transactionsData ? JSON.parse(transactionsData!) : [];
        } catch(error) {
            console.log(error)
            return [];
        }
    }

    async function getExpansesCategoryAmount() {
        const transactions = await getTransactions();

        const expanses = transactions
            .filter((transaction: TransactionProps)=>(
                transaction.type === 'expanse' &&
                new Date(transaction.date).getMonth() === selectedDate.getMonth() &&
                new Date(transaction.date).getFullYear() === selectedDate.getFullYear()
            ));

        
        const totalExpanses = expanses
        .reduce((accumulator: Number, expanse: TransactionProps) => {
            return accumulator + expanse.amount;
        }, 0);
        
        
        const totalByCategory: CategoryProps[] = categories.map(category=>{
            let categorySum = 0;

            expanses.forEach((expanse: TransactionProps) => {
                if(expanse.category === category.key) {
                    categorySum += Number(expanse.amount);
                }
            });

            const total = categorySum.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });

            const percent = `${((categorySum / totalExpanses) * 100).toFixed(0)}%`;

            return {
                key: category.key,
                name: category.name,
                color: category.color,
                amount: categorySum,
                formatedAmount: total,
                percent
            }
        }).filter(category=> category.amount > 0);

        setCategoriesTotal(totalByCategory);
        setIsLoading(false);
    }
    
    useFocusEffect(useCallback(() => {
        getExpansesCategoryAmount();
    }, [selectedDate]));

    return(
        <Container>
            <Header title="Resumo por categoria"/>

            <Content
                tabBarHeight={useBottomTabBarHeight()}
            >
                <MonthSelectorContainer
                >
                    <MonthSelector 
                        date={selectedDate}
                        onChangeDate={setSelectedDate}
                    />
                </MonthSelectorContainer>

                { isLoading ? (
                    <Loader/>
                ) : (
                    <>
                        <ChartContainer>
                            <VictoryPie
                                data={categoriesTotal}
                                colorScale={categoriesTotal.map(category=> category.color)}
                                style={{
                                    labels: {
                                        fontSize: RFValue(18),
                                        fontWeight: 'bold',
                                        fill: '#FFFFFF'
                                    }
                                }}
                                labelRadius={80}
                                x="percent"
                                y="amount"
                            />
                        </ChartContainer>

                        {categoriesTotal && categoriesTotal.map(category=> (
                            <HistoryCard 
                                title={category.name}
                                amount={category.formatedAmount}
                                color={category.color}
                                key={category.key}
                            />
                        ))}
                    </>
                )}
            </Content>

        </Container>
    )
}