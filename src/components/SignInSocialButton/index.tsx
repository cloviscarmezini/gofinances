import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';

interface SignInSocialButtonProps extends RectButtonProps {
    title: string;
    icon: React.FC<SvgProps>;
}

import {
    Button,
    IconContainer,
    Title
} from './styles';

export function SignInSocialButton({ title, icon: Icon, ...rest }: SignInSocialButtonProps) {
    return (
        <Button {...rest}>
            <IconContainer>
                <Icon />
            </IconContainer>
            <Title>
                { title }
            </Title>
        </Button>
    );
}