import { StyleSheet, SafeAreaView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ConnectionScreen from '../../screens/connection/ConnectionScreen';
import CreateAccount from '../../screens/connection/CreateAccount';
import SetSkills from '../../screens/connection/SetSkills';
import Login_Id from '../../screens/connection/Login_Id';
import Login_password from '../../screens/connection/Login_password'

import { MyLightTheme, MyDarkTheme } from '../Theme';

export default function ConnectionStack() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
            <Stack.Screen name="ConnectionScreen" component={ConnectionScreen} />
            <Stack.Screen name="CreateAccount" component={CreateAccount} />
            <Stack.Screen name="SetSkills" component={SetSkills} />
            <Stack.Screen name="Login_Id" component={Login_Id} />
            <Stack.Screen name="Login_password" component={Login_password} />
        </Stack.Navigator>
    );
};