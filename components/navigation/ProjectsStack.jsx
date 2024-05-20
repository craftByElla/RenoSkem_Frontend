import { StyleSheet, SafeAreaView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewProjectScreen from '../../screens/projects/NewProjectScreen';
import ProjectsScreen from '../../screens/projects/ProjectsScreen';
import { MyLightTheme, MyDarkTheme } from '../Theme';

export default function ProjectsStack() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ProjectsScreen" component={ProjectsScreen} />
            <Stack.Screen name="NewProjectScreen" component={NewProjectScreen} />
        </Stack.Navigator>
    );
};