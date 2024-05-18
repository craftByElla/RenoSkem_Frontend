import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';

export const MyLightTheme = {
    ...DefaultTheme,
    dark: false,
    colors: {
        ...DefaultTheme.colors,
        primary: '#264653',
        background: '#D9D9D9',
        notification: '#D9D9D9',
        deepGreen: '#264653',
        lightGreen: '#2A9D8F',
        orange: '#E76F51',
        lightGrey: '#E9ECEF',
        deepGrey: '#6D797B',
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