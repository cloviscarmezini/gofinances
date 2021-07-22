import React, { useState } from 'react';
import { 
    Modal,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';

import { InputForm } from '../../components/Form/InputForm';
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { Header } from '../../components/Header';
import { CategorySelect } from '../CategorySelect';

import uuid from 'react-native-uuid';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useForm } from "react-hook-form";
import { useNavigation } from '@react-navigation/native';

import { 
    Container,
    Form,
    Fields,
    TransactionsType
 } from './styles';


 interface FormDataProps {
    title: string;
    amount: string;
 }

 const schema = Yup.object().shape({
    title: Yup.string().required('Nome é obrigatório'),
    amount: Yup
        .number()
        .typeError('Informe um valor numérico')
        .positive('O valor não pode ser negativo')
 });

export function Register() {
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria'
    });

    const navigation =useNavigation();

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

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

    async function handleRegister(formData: FormDataProps) {
        if(!transactionType) {
            return Alert.alert('Selecione o tipo da transação');
        }

        if(category.key === 'category') {
            return Alert.alert('Selecione a categoria');
        }

        const newTransaction = {
            id: String(uuid.v4()),
            title: formData.title,
            amount: formData.amount,
            type: transactionType,
            category: category.key,
            date: new Date()
        }

        const currentTransactions = await getTransactions();

        const newTransactions = [
            ...currentTransactions,
            newTransaction
        ];

        try {
            const dataKey = '@gofinances:transactions';

            await AsyncStorage.setItem(dataKey, JSON.stringify(newTransactions));
            
            reset();
            setTransactionType('');
            setCategory({
                key: 'category',
                name: 'Categoria'
            });

            navigation.navigate('Listagem');
        } catch(error) {
            console.log(error);
            Alert.alert('Não foi possível salvar');
        }
    }

    function handleTransactionsTypeSelect(type: 'income' | 'expanse') {
        setTransactionType(type);
    }

    function handleCloseCategorySelectModal() {
        setCategoryModalOpen(false);
    }

    function handleOpenCategorySelectModal() {
        setCategoryModalOpen(true);
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header title="Cadastro"/>

                <Form>
                    <Fields>
                        <InputForm 
                            control={control}
                            name="title"
                            placeholder="Nome"
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            error={errors.title?.message}
                        />

                        <InputForm 
                            control={control}
                            name="amount"
                            placeholder="Preço"
                            keyboardType="numeric"
                            error={errors.amount?.message}
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

                    <Button
                        title="Enviar" 
                        onPress={handleSubmit(handleRegister)}
                    />
                </Form>
            </Container>
        </TouchableWithoutFeedback>
    )
}