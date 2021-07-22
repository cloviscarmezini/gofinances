import React, { ReactNode, useContext, createContext } from 'react';

import * as AuthSession from 'expo-auth-session';

interface AuthProviderProps {
    children: ReactNode;
}

interface UserProps {
    id: string;
    name: string;
    email: string;
    photo?: string;
}

interface AuthContextData {
    user: UserProps;
    signInWithGoogle: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const user = {
        id: '123',
        name: 'Clovão',
        email: 'cloviscarmezini14@gmail.com',
    };

    async function signInWithGoogle() {
        try {
            const CLIENT_ID = '1061818463754-4h8m0usqu70dnjfvpmvc3l280saogamr.apps.googleusercontent.com';
            const REDIRECT_URI = 'https://auth.expo.io/@clovis.carmezini/gofinances';
            const RESPONSE_TYPE = 'token';
            const SCOPE = encodeURI('profile email');

            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

            const response = await AuthSession.startAsync({ authUrl });

            console.log(response);
        } catch(error) {
            throw new Error(error);
        }
    }

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
