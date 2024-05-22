import { StyleSheet, SafeAreaView, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MyLightTheme, MyDarkTheme } from '../Theme';
import WhereToStartScreen from '../../screens/tutos/WhereToStartScreen';
import WhichArtisanScreen from '../../screens/tutos/WhichArtisanScreen';
import DIYorProTutoScreen from '../../screens/tutos/DIYorProTutoScreen';
import PlanningTutoScreen from '../../screens/tutos/PlanningTutoScreen';
import LogoTransparent from '../logos/LogoTransparent';
import IconButton from '../buttons/IconButton';


export default function TutoStack ({ navigation }) {
    const Scroll = createMaterialTopTabNavigator();
    return (
        <SafeAreaView style={{flex:1}}>
            <View style={{display: 'flex',flexDirection: 'row',justifyContent: 'center', alignItems: 'center', marginBottom:10, height: 50 ,position: 'relative'}}>
                <IconButton
                    style={{position: 'absolute', left: 20, top: '50%', marginTop: -25,}}
                    onPress={() => navigation.navigate('TabNavigator', { screen: 'Projets', params: { screen: 'ProjectsScreen' } })}
                    iconName="long-arrow-left"
                />
                <LogoTransparent />
            </View>
            <Scroll.Navigator 
                screenOptions={{ 
                headerShown: false, 
                tabBarStyle: { borderWidth: 1, borderBottomColor: 'rgba(231, 111, 81, 0.2)', borderColor: 'transparent', backgroundColor: MyLightTheme.colors.background },
                tabBarActiveTintColor: 'rgba(231, 111, 81, 1)',
                tabBarInactiveTintColor: 'rgba(231, 111, 81, 0.2)', // Couleur des étiquettes d'onglet non sélectionnées
                tabBarIndicatorStyle: { backgroundColor: 'rgba(231, 111, 81, 1)', height: 2 }, // Pour ne pas afficher l'indicateur
                }}
            > 
                <Scroll.Screen options={{ tabBarLabel: '1' }} name="WhereToStartScreen" component={WhereToStartScreen} />
                <Scroll.Screen options={{ tabBarLabel: '2' }} name="WhichArtisanScreen" component={WhichArtisanScreen} />
                <Scroll.Screen options={{ tabBarLabel: '3' }} name="DIYorProTutoScreen" component={DIYorProTutoScreen} />
                <Scroll.Screen options={{ tabBarLabel: '4' }} name="PlanningTutoScreen" component={PlanningTutoScreen} />
            </Scroll.Navigator>
        </SafeAreaView>
    );
};