// CreateProjectTabs.js
import React from 'react';
import {  View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RoomsScreen from '../../screens/createProject/RoomsScreen';
import ArtisanScreen from '../../screens/createProject/ArtisansScreen';
import DIYOrProScreen from '../../screens/createProject/DIYorPro';
import PlanningScreen from '../../screens/createProject/Planning';
import LogoTransparent from '../logos/LogoTransparent';
import IconButton from '../buttons/IconButton';
import { MyLightTheme } from '../Theme';

const Tab = createMaterialTopTabNavigator();

export default function CreateProjectTabs({ navigation }) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: MyLightTheme.colors.background }}>
            <View style={{display: 'flex',flexDirection: 'row',justifyContent: 'center', alignItems: 'center', marginBottom:10, height: 50 ,position: 'relative'}}>
                <IconButton
                    style={{position: 'absolute', left: 20, top: '50%', marginTop: -25,}}
                    onPress={() => navigation.navigate('TabNavigator', { screen: 'Projets', params: { screen: 'ProjectsScreen' } })}
                    iconName="long-arrow-left"
                />
                <LogoTransparent />
            </View>
            <Tab.Navigator 
                screenOptions={{ 
                    headerShown: false, 
                    tabBarStyle: { shadowOffset: 0, shadowRadius: 0, alignSelf: 'center', width: '60%', borderBottomWidth: 1, borderBottomColor: 'rgba(231, 111, 81, 0.2)', backgroundColor: MyLightTheme.colors.background },
                    tabBarActiveTintColor: 'rgba(231, 111, 81, 1)',
                    tabBarInactiveTintColor: 'rgba(231, 111, 81, 0.2)', 
                    tabBarIndicatorStyle: { backgroundColor: 'rgba(231, 111, 81, 1)', height: 2 },
                }}
            >
                <Tab.Screen options={{ tabBarLabel: '1' }} name="RoomsScreen" component={RoomsScreen} />
                <Tab.Screen options={{ tabBarLabel: '2' }} name="ArtisanScreen" component={ArtisanScreen} />
                <Tab.Screen options={{ tabBarLabel: '3' }} name="DIYOrProScreen" component={DIYOrProScreen} />
                <Tab.Screen options={{ tabBarLabel: '4' }} name="PlanningScreen" component={PlanningScreen} />
            </Tab.Navigator>
        </SafeAreaView>
    );
}
