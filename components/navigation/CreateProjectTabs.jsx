import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Platform, SafeAreaView as SafeAreaViewIOS } from 'react-native';
import { SafeAreaView as SafeAreaViewANDR } from 'react-native-safe-area-context';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RoomsScreen from '../../screens/createProject/RoomsScreen';
import ArtisanScreen from '../../screens/createProject/ArtisansScreen';
import DIYOrProScreen from '../../screens/createProject/DIYorPro';
import PlanningScreen from '../../screens/createProject/Planning';
import LogoTransparent from '../logos/LogoTransparent';
import IconButton from '../buttons/IconButton';
import { MyLightTheme } from '../Theme';
import Toast from 'react-native-toast-message';

const SafeAreaView = Platform.OS === 'ios' ? SafeAreaViewIOS : SafeAreaViewANDR;
const Tab = createMaterialTopTabNavigator();
const ipString = process.env.IP_ADDRESS;

export default function CreateProjectTabs({ navigation, route }) {
    const { projectId } = route.params;
    const [projectImage, setProjectImage] = useState(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const url = `${ipString}/projects/getProject/${projectId}`;
                console.log('Fetching project data from URL:', url); // Debugging line
                const response = await fetch(url);
                const data = await response.json();

                if (response.ok) {
                    console.log('Project data:', data); // Debugging line
                    setProjectImage(data.project.picture);
                } else {
                    console.error('Error response from server:', data); // Debugging line
                    Toast.show({
                        type: 'error',
                        text1: 'Erreur',
                        text2: data.message || 'Une erreur est survenue lors de la récupération du projet'
                    });
                }
            } catch (error) {
                console.error('Error fetching project:', error); // Debugging line
                Toast.show({
                    type: 'error',
                    text1: 'Erreur',
                    text2: 'Une erreur est survenue lors de la récupération du projet'
                });
            }
        };

        fetchProject();
    }, [projectId]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <IconButton
                    style={styles.iconButtonLeft}
                    onPress={() => navigation.navigate('TabNavigator', { screen: 'Projets', params: { screen: 'ProjectsScreen' } })}
                    iconName="long-arrow-left"
                />
                {!projectImage && <LogoTransparent />}
            </View>
            {projectImage && (
                <View style={styles.imageContainer}>
                    <Image source={{ uri: projectImage }} style={styles.image} />
                </View>
            )}
            <Tab.Navigator 
                screenOptions={{ 
                    headerShown: false, 
                    tabBarStyle: styles.tabBarStyle,
                    tabBarActiveTintColor: 'rgba(231, 111, 81, 1)',
                    tabBarInactiveTintColor: 'rgba(231, 111, 81, 0.2)', 
                    tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
                }}
            >
                <Tab.Screen 
                    name="RoomsScreen" 
                    component={RoomsScreen} 
                    options={{ tabBarLabel: '1' }} 
                    initialParams={{ projectId }} 
                />
                <Tab.Screen 
                    name="ArtisanScreen" 
                    component={ArtisanScreen} 
                    options={{ tabBarLabel: '2' }} 
                    initialParams={{ projectId }} 
                />
                <Tab.Screen 
                    name="DIYOrProScreen" 
                    component={DIYOrProScreen} 
                    options={{ tabBarLabel: '3' }} 
                    initialParams={{ projectId }} 
                />
                <Tab.Screen 
                    name="PlanningScreen" 
                    component={PlanningScreen} 
                    options={{ tabBarLabel: '4' }} 
                    initialParams={{ projectId }} 
                />
            </Tab.Navigator>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: MyLightTheme.colors.background,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        height: 50,
        position: 'relative',
    },
    iconButtonLeft: {
        position: 'absolute', 
        left: 20, 
        top: '50%', 
        marginTop: -25, 
    },
    tabBarStyle: {
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 0,
        alignSelf: 'center',
        width: '60%',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(231, 111, 81, 0.2)',
        backgroundColor: MyLightTheme.colors.background,
    },
    tabBarIndicatorStyle: {
        backgroundColor: 'rgba(231, 111, 81, 1)',
        height: 2,
    },
    
    imageContainer: {
        position: 'absolute',
        top: 50,
        width: 60, // diamètre
        height: 60, // cette valeur doit être égale à la largeur pour obtenir un cercle
        borderWidth: 1,
        borderColor: MyLightTheme.colors.lightGreen,
        justifyContent: 'center',
        alignItems: 'center',
        left: '50%',
        marginLeft: -(60 / 2), // Centrer horizontalement
        borderRadius: 30, // La moitié de la dimension pour rendre le conteneur circulaire
        zIndex: 1,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
});
