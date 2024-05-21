import { useEffect } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/home/HomeScreen';
import ChangeInformationsScreen from '../../screens/home/ChangeInformationsScreen';
import SkillsScreen from '../../screens/home/SkillsScreen';
import ChangeSkillsScreen from '../../screens/home/ChangeSkillsScreen';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

export default function HomeStack({ navigation, route }) {
    const Stack = createNativeStackNavigator();

    useEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === 'SkillsScreen' || routeName === 'ChangeInformationsScreen' || routeName === 'ChangeSkillsScreen') {
            navigation.setOptions({ tabBarStyle: { display: 'none' } });
        } else {
            navigation.setOptions({ tabBarStyle: { display: 'flex' } });
        }
    }, [navigation, route]);

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="SkillsScreen" component={SkillsScreen} />
            <Stack.Screen name="ChangeInformationsScreen" component={ChangeInformationsScreen} />
            <Stack.Screen name="ChangeSkillsScreen" component={ChangeSkillsScreen}
        />
        </Stack.Navigator>
    );
};