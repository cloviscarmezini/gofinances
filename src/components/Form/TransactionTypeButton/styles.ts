import styled, { css } from "styled-components/native";
import { TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";

interface IconProps {
    type: 'income' | 'expanse';
}

interface ContainerProps extends IconProps{
    isActive: boolean;
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
    width: 48%;
    border-width: ${({isActive }) => isActive ? 0 : 1.5 }px;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.text};
    border-radius: 5px;
    padding: 16px;
    
    flex-direction: row;
    align-items: center;
    justify-content: center;

    ${({ theme, isActive, type }) => isActive && type === 'expanse' && css`
        background-color: ${theme.colors.danger_light};
    ` };

    ${({ theme, isActive, type }) => isActive && type === 'income' && css`
        background-color: ${theme.colors.success_light};
    ` };
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