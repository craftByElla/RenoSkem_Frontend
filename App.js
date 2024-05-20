import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ConnectionScreen from './screens/connection/ConnectionScreen';
import NewArtisanScreen from './screens/team/NewArtisanScreen';
import NewCoworkerScreen from './screens/team/NewCoworkerScreen';
import TeammateSkillsScreen from './screens/team/TeammateSkillsScreen';
import TutoStack from './components/navigation/TutoStack';
import TabNavigator from './components/navigation/TabNavigator';
import { MyLightTheme, MyDarkTheme } from './components/Theme';


export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer theme={MyLightTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ConnectionScreen" component={ConnectionScreen} />
        <Stack.Screen name='TutoStack' component={TutoStack} />
        <Stack.Screen name="NewArtisanScreen" component={NewArtisanScreen} />
        <Stack.Screen name="NewCoworkerScreen" component={NewCoworkerScreen} />
        <Stack.Screen name="TeammateSkillsScreen" component={TeammateSkillsScreen} />
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
