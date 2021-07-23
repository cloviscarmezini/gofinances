import React, { useState } from 'react';
import { Alert, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import AppleSvg from '../../assets/apple-icon.svg';
import GoogleSvg from '../../assets/google-icon.svg';
import LogoSvg from '../../assets/logo.svg';
import { Loader } from '../../components/Loader';
import { SignInSocialButton } from '../../components/SignInSocialButton';
import { useAuth } from '../../hooks/auth';
import { useTheme } from 'styled-components';

import {
    Container,
    Header,
    TitleWrapper,
    Title,
    SignInTitle,
    Footer,
    FooterWrapper
} from './styles';

export function SignIn() {
    const [isLoading, setIsLoading] = useState(false);
    const { signInWithGoogle, signInWithApple, isAuthenticated } = useAuth();

    const theme = useTheme();

    async function handleSigInWithGoogle() {
        try {
            setIsLoading(true);
            return await signInWithGoogle();
        } catch(error) {
            console.log(error);
            Alert.alert('Não foi possível conectar à conta Google');
        } finally {
            !isAuthenticated && setIsLoading(false);
        }
    }

    async function handleSignInWithApple() {
        try {
            setIsLoading(true);
            return await signInWithApple();
        } catch(error) {
            Alert.alert('Não foi possível conectar à conta Apple');
        } finally {
            !isAuthenticated && setIsLoading(false);
        }
    }

    return (
        <Container>
            <Header>
                <TitleWrapper>
                    <LogoSvg
                        height={RFValue(68)}
                        width={RFValue(120)}
                    />

                    <Title>
                        Controle suas{ '\n' }finanças de forma{ '\n' }muito simples
                    </Title>
                </TitleWrapper>

                <SignInTitle>
                    Faça o seu login com{ '\n' }uma das contas abaixo
                </SignInTitle>
            </Header>
            
            <Footer>
                <FooterWrapper>
                    <SignInSocialButton
                        icon={GoogleSvg}
                        title="Entrar com Google"
                        onPress={handleSigInWithGoogle}
                    />
                    { Platform.OS === 'ios' && (
                        <SignInSocialButton
                            icon={AppleSvg}
                            title="Entrar com Apple"
                            onPress={handleSignInWithApple}
                        />
                    )}
                </FooterWrapper>
                { isLoading && (
                    <Loader color={theme.colors.shape} />
                )}
            </Footer>
        </Container>
    );
}