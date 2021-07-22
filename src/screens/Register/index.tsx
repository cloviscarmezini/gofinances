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

import { useForm } from "react-hook-form";

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { CategorySelect } from '../CategorySelect';

import { 
    Container,
    Form,
    Fields,
    TransactionsType
 } from './styles';

 interface FormDataProps {
    name: string;
    amount: string;
 }

 const schema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
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

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });


    function onSubmit(formData: FormDataProps) {
        if(!transactionType) {
            return Alert.alert('Selecione o tipo da transação');
        }

        if(category.key === 'category') {
            return Alert.alert('Selecione a categoria');
        }

        const data = {
            name: formData.name,
            amount: formData.amount,
            transactionType,
            category: category.key
        }
        
        console.log(data)
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
                            name="name"
                            placeholder="Nome"
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            error={errors.name?.message}
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
                        onPress={handleSubmit(onSubmit)}
                    />
                </Form>
            </Container>
        </TouchableWithoutFeedback>
    )
}