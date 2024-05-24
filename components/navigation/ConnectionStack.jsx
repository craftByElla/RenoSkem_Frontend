import { StyleSheet, SafeAreaView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ConnectionScreen from '../../screens/connection/ConnectionScreen';
import CreateAccount from '../../screens/connection/CreateAccount';
import SetSkills from '../../screens/connection/SetSkills';
import Login_Id from '../../screens/connection/Login_Id';
import Login_password from '../../screens/connection/Login_password'

import { MyLightTheme, MyDarkTheme } from '../Theme';  // Importation des thèmes personnalisés (thème clair et sombre)

export default function ConnectionStack() {    // Définition du composant ConnectionStack
    const Stack = createNativeStackNavigator(); // Création d'un Stack Navigator
    return (                                // Cache l'en-tête pour tous les écrans
        <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>  Définit l'animation de transition entre les écrans à 'fade'
            <Stack.Screen name="ConnectionScreen" component={ConnectionScreen} />  {/* Définition des différentes routes du Stack Navigator */}
            <Stack.Screen name="CreateAccount" component={CreateAccount} /> // Nom de la route + composant a afficher
            <Stack.Screen name="SetSkills" component={SetSkills} />
            <Stack.Screen name="Login_Id" component={Login_Id} />
            <Stack.Screen name="Login_password" component={Login_password} />
        </Stack.Navigator>
    );
};