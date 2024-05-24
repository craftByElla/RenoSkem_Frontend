import { StyleSheet, SafeAreaView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/home/HomeScreen'; // Importation des composants d'écran spécifiques à l'écran d'accueil
import ChangeInformationsScreen from '../../screens/home/ChangeInformationsScreen';
import { MyLightTheme, MyDarkTheme } from '../Theme';  // Importation des thèmes personnalisés (thème clair et sombre)

export default function HomeStack() {  // Définition du composant HomeStack
    const Stack = createNativeStackNavigator();  // Création d'un Stack Navigator
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>  // Options de navigation par défaut : cache l'en-tête pour tous les écrans
            <Stack.Screen name="HomeScreen" component={HomeScreen} />   {/* Définition des différentes routes du Stack Navigator */}  {/* Écran d'accueil */}
            <Stack.Screen name="ChangeInformationsScreen" component={ChangeInformationsScreen} />  {/* Écran de modification des informations */}
        </Stack.Navigator>
    );
};