import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ConnectionStack from './components/navigation/ConnectionStack';
import HomeStack from './components/navigation/HomeStack';
import TutoStack from './components/navigation/TutoStack';
import TabNavigator from './components/navigation/TabNavigator';
import { MyLightTheme, MyDarkTheme } from './components/Theme';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import user from './reducers/user';
import { LogBox } from 'react-native';

export default function App() {
  const Stack = createNativeStackNavigator();
  LogBox.ignoreAllLogs(); // Ignore all log notifications

  const store = configureStore({
    reducer: { user },
  });

  return (
    <Provider store={store}>
      <NavigationContainer theme={MyLightTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="ConnectionStack" component={ConnectionStack} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
        <Toast />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});