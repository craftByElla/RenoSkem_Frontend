import { StyleSheet, SafeAreaView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/home/HomeScreen'; // Importation des composants d'écran spécifiques à l'écran d'accueil
import ChangeInformationsScreen from '../../screens/home/ChangeInformationsScreen';
import { MyLightTheme, MyDarkTheme } from '../Theme';  // Importation des thèmes personnalisés (thème clair et sombre)

export default function HomeStack() {  // Définition du composant HomeStack
    const Stack = createNativeStackNavigator();  
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>  
            <Stack.Screen name="HomeScreen" component={HomeScreen} />   
            <Stack.Screen name="ChangeInformationsScreen" component={ChangeInformationsScreen} /> 
        </Stack.Navigator>
    );
};