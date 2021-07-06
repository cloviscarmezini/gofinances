import React, { useState } from 'react';
import { Modal } from 'react-native';

import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { Header } from '../../components/Header';

import { CategorySelect } from '../CategorySelect';

import { 
    Container,
    Form,
    Fields,
    TransactionsType
 } from './styles';

export function Register() {
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria'
    });

    function handleTransactionsTypeSelect(type: 'income' | 'expanse') {
        setTransactionType(type);
    }

    function handleCloseCategorySelectModal() {
        setCategoryModalOpen(false);
    }

    function handleOpenCategorySelectModal() {
        setCategoryModalOpen(true);
    }

    // function handleSetCategorySelect() {
    //     setCategory(false);
    // }

    return (
        <Container>
            <Header title="Cadastro"/>

            <Form>
                <Fields>
                    <Input 
                        placeholder="Nome"
                    />
                    <Input 
                        placeholder="Preço"
                    />

                    <TransactionsType>
                        <TransactionTypeButton
                            title="Receita"
                            type="income"
                            isActive={transactionType === 'income'}
                            onPress={() => handleTransactionsTypeSelect('income')}
                        />

                        <TransactionTypeButton
                            title="Despesa"
                            type="expanse"
                            isActive={transactionType === 'expanse'}
                            onPress={() => handleTransactionsTypeSelect('expanse')}
                        />
                    </TransactionsType>

                    <CategorySelectButton
                        title={category.name}
                        onPress={handleOpenCategorySelectModal}
                    />
                </Fields>

                <Modal visible={categoryModalOpen}>
                    <CategorySelect 
                        category={category}
                        setCategory={setCategory}
                        closeSelectCategory={handleCloseCategorySelectModal}
                    />
                </Modal>

                <Button title="Enviar" />
            </Form>
        </Container>
    )
}