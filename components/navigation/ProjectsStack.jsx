import { StyleSheet, SafeAreaView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewProjectScreen from '../../screens/projects/NewProjectScreen';
import ProjectsScreen from '../../screens/projects/ProjectsScreen';
import { MyLightTheme, MyDarkTheme } from '../Theme';

export default function ProjectsStack() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Définition du Stack Navigator avec les options de navigation */}
        {/* Options globales spécifiées pour le Stack Navigator */}
        {/* headerShown: false indique que l'en-tête ne sera pas affiché pour tous les écrans */}
            <Stack.Screen name="ProjectsScreen" component={ProjectsScreen} /> {/* Premier écran : ProjectsScreen */} {/* Définition de l'écran ProjectsScreen avec son nom et le composant ProjectsScreen associé */}
            <Stack.Screen name="NewProjectScreen" component={NewProjectScreen} /> {/* Deuxième écran : NewProjectScreen */} {/* Définition de l'écran NewProjectScreen avec son nom et le composant NewProjectScreen associé */}
        </Stack.Navigator>
    );
};