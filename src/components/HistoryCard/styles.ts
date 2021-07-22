import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface HistoryCardStyleProps {
    color: string;
}

export const Container = styled.View<HistoryCardStyleProps>`
    height: ${RFValue(48)}px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.shape};
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 13px 24px;

    border-left-width: 4px;
    border-left-color: ${({ color }) => color};
    border-radius: 5px;

    margin-bottom: 8px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(15)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Amount = styled.Text`
    font-size: ${RFValue(15)}px;
    font-family: ${({ theme }) => theme.fonts.bold};
`;