import styled from 'styled-components/native';

import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

export const Button = styled(RectButton)`
    background-color: ${({ theme }) => theme.colors.shape};
    width: 100%;
    border-radius: 5px;
    flex-direction: row;
    align-items: center;
    height: ${RFValue(56)}px;

    margin-bottom: 16px;
`; 

export const IconContainer = styled.View`
    height: 100%;
    padding: ${RFValue(16)}px;

    align-items: center;
    justify-content: center;

    border-right-width: 1px;
    border-right-color: ${({ theme }) => theme.colors.background};
`;

export const Title = styled.Text`
    flex: 1;
    text-align: center;

    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(14)}px;
`;