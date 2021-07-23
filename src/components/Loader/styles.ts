import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`

export const LoaderIcon = styled(ActivityIndicator).attrs(({theme, color}) => ({
    color: color ? color : theme.colors.secondary,
    size: 'large'
}))``