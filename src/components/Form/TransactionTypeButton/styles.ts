import styled, { css } from "styled-components/native";
import { RectButton } from 'react-native-gesture-handler';

import { Feather } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";

interface IconProps {
    type: 'income' | 'expanse';
}

interface ContainerProps extends IconProps{
    isActive: boolean;
}

export const Container = styled.View<ContainerProps>`
    width: 48%;

    border-width: ${({isActive }) => isActive ? 0 : 1.5 }px;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.text};
    border-radius: 5px;

    ${({ theme, isActive, type }) => isActive && type === 'expanse' && css`
        background-color: ${theme.colors.danger_light};
    ` };

    ${({ theme, isActive, type }) => isActive && type === 'income' && css`
        background-color: ${theme.colors.success_light};
    ` };
`;

export const Button = styled(RectButton)`
    flex-direction: row;
    align-items: center;
    justify-content: center;

    padding: 16px;
`;

export const Icon = styled(Feather)<IconProps>`
    font-size: ${RFValue(24)}px;
    margin-right: 12px;
    color: ${
        ({ theme, type }) => type === 'expanse' 
        ? theme.colors.danger 
        : theme.colors.success
    };
`;

export const Title = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
`;