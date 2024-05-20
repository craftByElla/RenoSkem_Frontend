import { StyleSheet, SafeAreaView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MyLightTheme, MyDarkTheme } from '../Theme';
import RoomsScreen from '../../screens/createProject/RoomsScreen';
import ArtisanScreen from '../../screens/createProject/ArtisansScreen';
import DIYOrProScreen from '../../screens/createProject/DIYorPro';
import PlanningScreen from '../../screens/createProject/Planning';
import LogoTransparent from '../logos/LogoTransparent';

export default function CreateProjectStack() {
    const Scroll = createMaterialTopTabNavigator();
    return (
        <SafeAreaView style={{flex:1}}>
            <LogoTransparent />
        <Scroll.Navigator 
            screenOptions={{ 
            headerShown: false, 
            tabBarStyle: { shadowOffset: 0, shadowRadius: 0, alignSelf: 'center', width: '60%', borderBottomWidth: 1, borderLeftWidth: 'none',  borderBottomColor: 'rgba(231, 111, 81, 0.2)',  backgroundColor: MyLightTheme.colors.background },
            tabBarActiveTintColor: 'rgba(231, 111, 81, 1)',
            tabBarInactiveTintColor: 'rgba(231, 111, 81, 0.2)', // Couleur des étiquettes d'onglet non sélectionnées
            tabBarIndicatorStyle: { backgroundColor: 'rgba(231, 111, 81, 1)', height: 2 }, // Pour ne pas afficher l'indicateur
            tabBarIndicatorContainerStyle: {borderLeftWidth: 0}
            }}
            
        > 
            <Scroll.Screen options={{ tabBarLabel: '1' }} name="RoomsScreen" component={RoomsScreen} />
            <Scroll.Screen options={{ tabBarLabel: '2' }} name="ArtisanScreen" component={ArtisanScreen} />
            <Scroll.Screen options={{ tabBarLabel: '3' }} name="DIYOrProScreen" component={DIYOrProScreen} />
            <Scroll.Screen options={{ tabBarLabel: '4' }} name="PlanningScreen" component={PlanningScreen} />
        </Scroll.Navigator>
        </SafeAreaView>
    );
};