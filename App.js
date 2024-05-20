import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ConnectionStack from './components/navigation/ConnectionStack';
import HomeStack from './components/navigation/HomeStack';
import TutoStack from './components/navigation/TutoStack';
import TabNavigator from './components/navigation/TabNavigator';
import { MyLightTheme, MyDarkTheme } from './components/Theme';


export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer theme={MyLightTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ConnectionStack" component={ConnectionStack} />
        <Stack.Screen name='TutoStack' component={TutoStack} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
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
