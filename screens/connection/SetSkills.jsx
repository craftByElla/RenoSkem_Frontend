import React, { useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, SafeAreaView, ScrollView, Platform } from 'react-native';
import IconButton from "../../components/buttons/IconButton";
import TwoStep from "../../components/progressIndicator/TwoStep";
import ScreenTitle from "../../components/text/ScreenTitle";
import LogoTransparent from '../../components/logos/LogoTransparent';
import FilledButton from '../../components/buttons/FilledButton';
import TextWithRadioButtons from '../../components/buttons/TextWithRadioButtons'; 
import Stars from '../../components/buttons/Stars';
import { MyLightTheme } from '../../components/Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

// Liste des postes de travaux
const postesTravaux = [
    "Chauffage",
    "Cloisonnement/Plâtrage",
    "Démolition",
    "Électricité",
    "Étanchéité",
    "Façade",
    "Fondations",
    "Installation cuisine/SDB",
    "Isolation",
    "Maçonnerie",
    "Menuiserie",
    "Montage de meuble",
    "Peinture",
    "Plomberie",
    "Revêtements muraux",
    "Revêtements sol",
    "Revêtements extérieurs",
    "Toiture",
    "Ventilation"
];

function SetSkills({ navigation }) {
    // Initialisation de l'état des compétences
    const [skills, setSkills] = useState(postesTravaux.reduce((acc, poste) => {
        acc[poste] = null;
        return acc;
    }, {}));

    // Mise à jour de l'état lorsqu'une compétence est sélectionnée
    const handleSkillChange = (posteIndex, niveau) => {
        const poste = postesTravaux[posteIndex];
        setSkills(prevSkills => ({
            ...prevSkills,
            [poste]: niveau
        }));
    };

    // Fonction pour enregistrer les compétences
    const handleSaveSkills = async () => {
        // Récupération du token et de l'ID utilisateur
        const token = await AsyncStorage.getItem('userToken');
        const userId = await AsyncStorage.getItem('userId');

        // Données des compétences
        const skillsData = {
            'Chauffage': skills['Chauffage'],
            'Cloisonnement/Plâtrage': skills['Cloisonnement/Plâtrage'],
            'Démolition': skills['Démolition'],
            'Électricité': skills['Électricité'],
            'Étanchéité': skills['Étanchéité'],
            'Façade': skills['Façade'],
            'Fondations': skills['Fondations'],
            'Installation cuisine/SDB': skills['Installation cuisine/SDB'],
            'Isolation': skills['Isolation'],
            'Maçonnerie': skills['Maçonnerie'],
            'Menuiserie': skills['Menuiserie'],
            'Montage de meuble': skills['Montage de meuble'],
            'Peinture': skills['Peinture'],
            'Plomberie': skills['Plomberie'],
            'Revêtements muraux': skills['Revêtements muraux'],
            'Revêtements sol': skills['Revêtements sol'],
            'Revêtements extérieurs': skills['Revêtements extérieurs'],
            'Toiture': skills['Toiture'],
            'Ventilation': skills['Ventilation']
        };

        // Envoi des données au serveur
        const response = await fetch('http://192.168.100.227:3000/skills/setSkills', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(skillsData),
        });

        const data = await response.json();

        // Traitement de la réponse
        if (response.status === 201) {
            const skillsId = data.skills._id;

            // Mise à jour des compétences de l'utilisateur
            const addSkillsResponse = await fetch(`http://192.168.100.227:3000/users/addSkills/${userId}/${skillsId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': token,
                }
            });

            const addSkillsData = await addSkillsResponse.json();

            // Affichage d'un message de succès ou d'erreur
            if (addSkillsResponse.status === 200) {
                Toast.show({
                    type: 'success',
                    text1: 'Succès',
                    text2: 'Compétences mises à jour avec succès'
                });
                navigation.navigate('TabNavigator', { screen: 'Accueil', params: { screen: 'HomeScreen' } });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Erreur',
                    text2: addSkillsData.message
                });
            }
        } else {
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: data.message
            });
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.main}>
                        <View style={styles.header}>
                            <IconButton
                                style={styles.iconButton}
                                onPress={() => navigation.navigate('CreateAccount')}
                                iconName="arrow-left"
                            />
                            <LogoTransparent />
                        </View>
                        <View style={styles.progressIndicatorWrapper}>
                            <TwoStep step={2} /> 
                        </View>
                        <ScreenTitle text="Paramétrer votre niveau d’expertise" />
                        <Stars style={styles.stars}  />
                        <ScrollView style={styles.scrollableSection} contentContainerStyle={styles.scrollableContent}>
                            {postesTravaux.map((poste, index) => (
                                <TextWithRadioButtons 
                                    key={index} 
                                    text={poste} 
                                    selectedButton={skills[poste]} 
                                    handlePress={handleSkillChange} 
                                    index={index}
                                />
                            ))}
                        </ScrollView>
                        <View style={styles.buttonContainer}>
                            <FilledButton 
                                text='Enregistrer' 
                                background={MyLightTheme.colors.deepGreen} 
                                full={true}
                                onPress={handleSaveSkills}
                            /> 
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default SetSkills;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    main: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        position: 'relative',
    },
    iconButton: {
        position: 'absolute', 
        left: 20, 
        top: '50%', 
        marginTop: -25, 
    },
    progressIndicatorWrapper: {
        marginTop: 20,
        marginBottom: 30,
    },
    UserPictureWrapper: {
        marginTop: 10,
        marginBottom: 10,
    },
    stars: {
    },
    scrollableSection: {
        flexGrow: 1,
    },
    scrollableContent: {
        alignItems: 'center',
    },
    buttonContainer: {
        alignItems: 'center',
        width: "100%",
    },
    filledButton: {
        marginVertical: 10, 
    }
});
