import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

export const MonthSelectButton = styled(BorderlessButton)`

`

export const MonthSelectIcon = styled(Feather)`
    font-size: ${RFValue(24)}px;
`