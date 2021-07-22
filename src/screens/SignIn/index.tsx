import React, { useContext } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

import AppleSvg from '../../assets/apple-icon.svg';
import GoogleSvg from '../../assets/google-icon.svg';
import LogoSvg from '../../assets/logo.svg';
import { SignInSocialButton } from '../../components/SignInSocialButton';
import { useAuth } from '../../hooks/auth';

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
    const { signInWithGoogle } = useAuth();

    async function handleSiginWithGoogle() {
        try {
            await signInWithGoogle();
        } catch(error) {
            console.log(error);
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
                        onPress={handleSiginWithGoogle}
                    />
                    <SignInSocialButton icon={AppleSvg} title="Entrar com Apple"/>
                </FooterWrapper>
            </Footer>
        </Container>
    );
}