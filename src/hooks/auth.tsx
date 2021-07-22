import React, { ReactNode, useContext, createContext, useState } from 'react';

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
                
                setUser({
                    id: userInfo.id,
                    name: userInfo.given_name,
                    email: userInfo.email,
                    photo: userInfo.picture
                });

                console.log(user);
            }
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
