import styled from 'styled-components/native';

import { ScrollView } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

interface ContentProps {
    tabBarHeight: Number;
}

export const Container = styled.View`
    width: 100%;
    flex: 1;
`

export const MonthSelectorContainer = styled.View`
    margin-top: ${RFValue(41)}px;
`
export const Content = styled(ScrollView).attrs(({tabBarHeight}:ContentProps) => ({
    contentContainerStyle: {
        paddingHorizontal: 24,
        paddingBottom: tabBarHeight,
    },
    showVerticalScrollIndicator: false
}))``;

export const ChartContainer = styled.View`
    width: 100%;
    align-items: center;
`