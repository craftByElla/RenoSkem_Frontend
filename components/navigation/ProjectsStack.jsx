import { useEffect } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewProjectScreen from '../../screens/projects/NewProjectScreen';
import ProjectsScreen from '../../screens/projects/ProjectsScreen';
import { MyLightTheme, MyDarkTheme } from '../Theme';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

export default function ProjectsStack({ navigation, route }) {
    const Stack = createNativeStackNavigator();

    useEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === 'NewProjectScreen') {
            navigation.setOptions({ tabBarStyle: { display: 'none' } });
        } else {
            navigation.setOptions({ tabBarStyle: { display: 'flex' } });
        }
    }, [navigation, route]);



    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ProjectsScreen" component={ProjectsScreen} />
            <Stack.Screen name="NewProjectScreen" component={NewProjectScreen} />
        </Stack.Navigator>
        
    );
};