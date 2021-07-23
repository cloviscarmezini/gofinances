import React, { ReactNode, useContext, createContext, useState } from 'react';

import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

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
    isAuthenticated: Boolean;
    isLoading: Boolean;
    signInWithGoogle: () => Promise<void>;
    signInWithApple: () => Promise<void>;
    signOut: () => Promise<void>;
}

interface AuthorizationResponseProps {
    params: {
        access_token: string;
    },
    type: string;
}

interface GoogleResponseProps {
    id: string;
    email: string;
    name: string;
    family_name: string;
    given_name: string;
    picture: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>({} as UserProps);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const userStorageKey = '@gofinances:user';

    useEffect(() => {
        getUser();
    }, []);

    async function getUser() {
        const response =  await AsyncStorage.getItem(userStorageKey);

        const userLogged = response ? JSON.parse(response) as UserProps : null;

        if(!userLogged) {
            setIsAuthenticated(false);
            return;
        }

        setUser(userLogged);
        setIsAuthenticated(true);
        setIsLoading(false);
    }

    async function signOut() {
        setUser({} as UserProps);
        setIsAuthenticated(false);

        await AsyncStorage.removeItem(userStorageKey);
    }

    async function signInWithGoogle() {
        try {
            const CLIENT_ID = process.env.CLIENT_ID;
            const REDIRECT_URI = process.env.REDIRECT_URI;
            const RESPONSE_TYPE = 'token';
            const SCOPE = encodeURI('profile email');

            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

            const { type, params }  = await AuthSession
                .startAsync({ authUrl }) as AuthorizationResponseProps;

            if(type === 'success') {
                const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`)
                const userInfo = await response.json() as GoogleResponseProps;
                
                const userLogged = {
                    id: userInfo.id,
                    name: userInfo.given_name,
                    email: userInfo.email,
                    photo: userInfo.picture
                };

                
                setUser(userLogged);
                setIsAuthenticated(true);
                await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
            }
        } catch(error) {
            throw new Error(error);
        }
    }

    async function signInWithApple() {
        try {
            const userInfo = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL
                ]
            })

            if(userInfo) {
                const name = userInfo.fullName?.givenName!;
                const photo = `https://ui-avatars.com/api/?name=${name}`;

                const userLogged = {
                    id: userInfo.user,
                    name,
                    email: userInfo.email!,
                    photo
                };

                setUser(userLogged);
                setIsAuthenticated(true);
                await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isLoading, signInWithGoogle, signInWithApple, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
