import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';

export const MyLightTheme = {
    ...DefaultTheme,
    dark: false,
    colors: {
        ...DefaultTheme.colors,
        primary: '#264653',
        background: '#EFECEA',
        notification: '#D9D9D9',
        deepGreen: '#264653',
        lightGreen: '#2A9D8F',
        orange: '#E76F51',
        lightOrangeWithOpacity: 'rgba(231, 111, 81, 0.2)',
        lightGrey: '#E9ECEF',
        deepGrey: '#6F797B',
        modalBackgroundColor: "#FFF",
        wtfCetteCouleur: '#E2CFAF',
    },
};


export const MyDarkTheme = {
    ...DarkTheme,
    dark: true,
    colors: {
        ...DarkTheme.colors,
        primary: '#FFF',
        background: '#000',
        notification: '#D9D9D9',
        deepGreen: '#FFF',
        deepGreen: '',
        lightGreen: '',
        orange: '',
        lightGrey: '',
        deepGrey: '',
        modalBackgroundColor: '',
        wtfCetteCouleur: '',
    },
};