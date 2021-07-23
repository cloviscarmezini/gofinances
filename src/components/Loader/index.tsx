import React from 'react';

import {
    Container,
    LoaderIcon
} from './styles';

interface LoaderProps {
    color?: string;
}

export function Loader({ color }: LoaderProps) {
    return (
        <Container>
            <LoaderIcon color={color}/>
        </Container>
    );
}