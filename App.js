import React from 'react';
import { StatusBar } from 'react-native';
import DatabaseInit from './src/services/helpers';

import Routes from './src/routes';

export default function App() {

    new DatabaseInit
    console.log("initialize database")

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <Routes />
        </>
    );
}

