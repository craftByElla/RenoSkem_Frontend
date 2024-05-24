import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewProjectScreen from '../../screens/projects/NewProjectScreen';
import ProjectsScreen from '../../screens/projects/ProjectsScreen';
import CreateProjectTabs from '../../components/navigation/CreateProjectTabs'; 
import EditProjectScreen from '../../screens/projects/EditProjectScreen';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function ProjectsStack({ navigation, route }) {
    useEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === 'NewProjectScreen' || routeName === 'EditProjectScreen' ) {
            navigation.setOptions({ tabBarStyle: { display: 'none' } });
        } else {
            navigation.setOptions({ tabBarStyle: { display: 'flex' } });
        }
    }, [navigation, route]);

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ProjectsScreen" component={ProjectsScreen} />
            <Stack.Screen name="NewProjectScreen" component={NewProjectScreen} />
            <Stack.Screen name="EditProjectScreen" component={EditProjectScreen} />
            <Stack.Screen name="CreateProjectTabs" component={CreateProjectTabs} />
        </Stack.Navigator>
    );
}
