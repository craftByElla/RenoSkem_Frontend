import { StyleSheet, SafeAreaView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/home/HomeScreen';
import ChangeInformationsScreen from '../../screens/home/ChangeInformationsScreen';
import { MyLightTheme, MyDarkTheme } from '../Theme';

export default function HomeStack() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="ChangeInformationsScreen" component={ChangeInformationsScreen} />
        </Stack.Navigator>
    );
};