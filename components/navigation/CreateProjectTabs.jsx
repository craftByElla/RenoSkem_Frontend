import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, Platform, SafeAreaView as SafeAreaViewIOS } from 'react-native';
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
    const { projectId } = route.params; // Récupérer projectId des paramètres de la route
    const [projectImage, setProjectImage] = useState(null); // État pour l'image du projet
    const [projectName, setProjectName] = useState(null); // État pour le nom du projet

    // Utiliser useEffect pour récupérer les données du projet lorsque projectId change
    useEffect(() => {
        const fetchProject = async () => {
            try {
                const url = `${ipString}/projects/getProject/${projectId}`;
                // console.log('Fetching project data from URL:', url); // Ligne de débogage
                const response = await fetch(url);
                const data = await response.json();

                if (response.ok) {
                    // console.log('Project data:', data); // Ligne de débogage
                    setProjectImage(data.project.picture); // Mettre à jour l'état avec l'image du projet
                    setProjectName(data.project.name); // Mettre à jour l'état avec le nom du projet
                } else {
                    console.error('Error response from server:', data); // Ligne de débogage
                    Toast.show({
                        type: 'error',
                        text1: 'Erreur',
                        text2: data.message || 'Une erreur est survenue lors de la récupération du projet'
                    });
                }
            } catch (error) {
                // console.error('Error fetching project:', error); // Ligne de débogage
                Toast.show({
                    type: 'error',
                    text1: 'Erreur',
                    text2: 'Une erreur est survenue lors de la récupération du projet'
                });
            }
        };

        fetchProject(); // Appeler la fonction pour récupérer les données du projet
    }, [projectId]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <IconButton
                    style={styles.iconButtonLeft}
                    onPress={() => navigation.navigate('TabNavigator', { screen: 'Projets', params: { screen: 'ProjectsScreen' } })}
                    iconName="long-arrow-left"
                />
                <View style={styles.projectInfoContainer}>
                    {projectImage ? (
                        <Image source={{ uri: projectImage }} style={styles.image} />
                    ) : (
                        <LogoTransparent />
                    )}
                    {projectName && (
                        <Text style={styles.projectName}>{projectName}</Text>
                    )}
                </View>
            </View>
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
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        height: 50,
        position: 'relative',
        justifyContent: 'center', // Centrer le contenu horizontalement
    },
    iconButtonLeft: {
        position: 'absolute', 
        left: 20, 
        top: '50%', 
        marginTop: -25, 
    },
    projectInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
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
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: MyLightTheme.colors.lightGreen,
        marginRight: 10,
    },
    projectName: {
        alignSelf: 'center',
    },
});
