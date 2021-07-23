import React, { useCallback, useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import { HighlightCard } from "../../components/HighlightCard";
import {
    TransactionCard,
    TransactionCardDataProps,
} from "../../components/TransactionCard";

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
    TransactionsList,
    LogoutButton,
} from "./styles";

import { Loader } from "../../components/Loader";
import { useAuth } from "../../hooks/auth";

export interface TransactionCardListProps extends TransactionCardDataProps {
    id: string;
}

interface HighlightCardValueProps {
    amount: string;
    lastTransaction: string;
}

interface HighlightCardProps {
    income: HighlightCardValueProps;
    expanse: HighlightCardValueProps;
    total: HighlightCardValueProps;
}

export function Dashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<TransactionCardListProps[]>([]);
    const [highlightCardData, setHighlightCardData] =
        useState<HighlightCardProps>({} as HighlightCardProps);
    const { user, signOut } = useAuth();

    function handleSignOut() {
        signOut();
    }

    function getLastTransactionDate(
        transactions: TransactionCardListProps[],
        type: "income" | "expanse"
    ) {
        const lastTransaction = new Date(
            Math.max.apply(
                Math,
                transactions
                    .filter((transaction) => transaction.type === type)
                    .map((transaction) => new Date(transaction.date).getTime())
            )
        );

        return Intl.DateTimeFormat("pt-BR", {
            day: "2-digit",
            month: "long",
        }).format(lastTransaction);
    }

    async function loadTransactions() {
        const dataKey = `@gofinances:transactions_user:${user.email}`;
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];

        let incomeSum = 0;
        let expanseSum = 0;

        const formatedTransactions: TransactionCardListProps[] = transactions.map(
            (transaction: TransactionCardListProps) => {
                const amount = Number(transaction.amount).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                });

                const date = Intl.DateTimeFormat("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                }).format(new Date(transaction.date));

                transaction.type === "income"
                    ? (incomeSum += Number(transaction.amount))
                    : (expanseSum += Number(transaction.amount));

                return {
                    id: transaction.id,
                    title: transaction.title,
                    type: transaction.type,
                    amount,
                    category: transaction.category,
                    date,
                };
            }
        );

        const total = incomeSum - expanseSum;

        const lastTransactionIncome =
            incomeSum && getLastTransactionDate(transactions, "income");
        const lastTransactionExpanse =
            expanseSum && getLastTransactionDate(transactions, "expanse");
        const totalInterval = lastTransactionExpanse;

        setHighlightCardData({
            income: {
                amount: incomeSum.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                }),
                lastTransaction: lastTransactionIncome
                    ? `Última entrada dia ${lastTransactionIncome}`
                    : "Sem entradas",
            },
            expanse: {
                amount: expanseSum.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                }),
                lastTransaction: lastTransactionExpanse
                    ? `Última entrada dia ${lastTransactionExpanse}`
                    : "Sem saídas",
            },
            total: {
                amount: total.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                }),
                lastTransaction: totalInterval
                    ? `01 à ${lastTransactionExpanse}`
                    : "Sem dados",
            },
        });

        setTransactions(formatedTransactions);

        setIsLoading(false);
    }

    useEffect(() => {
        loadTransactions();
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadTransactions();
        }, [])
    );

    return (
        <Container>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <Header>
                        <UserWrapper>
                            <UserInfo>
                                <Photo
                                    source={{uri: user.photo}}
                                />
                                <User>
                                    <UserGretting>Olá,</UserGretting>
                                    <UserName>{user.name}</UserName>
                                </User>
                            </UserInfo>

                            <LogoutButton onPress={handleSignOut}>
                                <Icon name="power" />
                            </LogoutButton>
                        </UserWrapper>
                    </Header>

                    <HighlightCards>
                        <HighlightCard
                            title="Entradas"
                            amount={highlightCardData.income.amount}
                            lastTransaction={highlightCardData.income.lastTransaction}
                            type="income"
                        />

                        <HighlightCard
                            title="Saídas"
                            amount={highlightCardData.expanse.amount}
                            lastTransaction={highlightCardData.expanse.lastTransaction}
                            type="expanse"
                        />

                        <HighlightCard
                            title="Total"
                            amount={highlightCardData.total.amount}
                            lastTransaction={highlightCardData.total.lastTransaction}
                            type="total"
                        />
                    </HighlightCards>

                    <Transactions>
                        <Title>Listagem</Title>
                        {transactions ? (
                            <TransactionsList
                                data={transactions}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => <TransactionCard data={item} />}
                            />
                        ) : (
                            <Title>No data</Title>
                        )}
                    </Transactions>
                </>
            )}
        </Container>
    );
}
