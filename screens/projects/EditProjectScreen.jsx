import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableWithoutFeedback, Keyboard, SafeAreaView, Platform, TouchableOpacity, Image, Alert } from 'react-native';
import IconButton from "../../components/buttons/IconButton";
import ScreenTitle from "../../components/text/ScreenTitle";
import ProjectPicture from "../../components/images/ProjectPicture";
import CustomInput from "../../components/inputs/CustomInput";
import LogoTransparent from '../../components/logos/LogoTransparent';
import FilledButton from '../../components/buttons/FilledButton';
import { MyLightTheme } from '../../components/Theme';
import Toast from 'react-native-toast-message';
import ProjectIconSelectorModal from '../../components/modal/ProjectIconSelectorModal';
import { useSelector } from 'react-redux';

// Récupération de l'adresse IP à partir des variables d'environnement
const ipString = process.env.IP_ADDRESS;

function NewProjectScreen({ navigation }) {
    // Utilisation de Redux pour récupérer le token de l'utilisateur
    const userToken = useSelector((state) => state.user.userInfos.token);
    // Déclaration des états locaux pour gérer les données du formulaire
    const [name, setName] = useState('');
    const [budget, setBudget] = useState('');
    const [location, setLocation] = useState('');
    const [picture, setPicture] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);

    // Fonction pour basculer la visibilité du modal de sélection d'image
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    // Fonction pour gérer le clic sur le bouton "Enregistrer"
    const handleNext = () => {
        if (!name || !location || !budget) {
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: 'Tous les champs sont obligatoires'
            });
            return;
        }

        const projectData = {
            token: userToken,
            name,
            location,
            budget,
            picture: picture ? picture.uri : null
        };

        fetch(`${ipString}/projects/newProject`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.message) {
                if (data.message === 'Project successfully created') {
                    setName('');
                    setLocation('');
                    setBudget('');
                    setPicture(null); 
                    Toast.show({
                        type: 'success',
                        text1: 'Succès',
                        text2: 'Projet créé avec succès'
                    });
                    navigation.navigate('Projets', { screen: 'CreateProjectTabs', params: { screen: 'RoomsScreen' } });
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Erreur',
                        text2: data.message
                    });
                }
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Erreur',
                    text2: 'Une erreur est survenue sans message spécifique.'
                });
            }
        })
        .catch((error) => {
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: 'Une erreur est survenue'
            });
        });
    };

    // Fonction pour gérer la sélection de l'image
    const handleImageSelect = (image) => {
        setPicture(image);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.innerContainer}>
                    <View style={styles.header}>
                        <IconButton
                            style={styles.iconButton}
                            onPress={() => navigation.navigate('ProjectsScreen')}
                            iconName="long-arrow-left"
                        />
                        <LogoTransparent />
                    </View>
                    <View style={styles.titleContainer}>
                        <ScreenTitle style={styles.ScreenTitle} text="Modifier mon projet" />
                    </View>
                    <View style={styles.ProjectPictureWrapper}>
                        <TouchableOpacity onPress={toggleModal}>
                            <View style={styles.pictureWrapper}>
                                {picture ? (
                                    <Image source={picture} style={styles.picture} />
                                ) : (
                                    <ProjectPicture />
                                )}
                            </View>
                        </TouchableOpacity>
                    </View>
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <View style={styles.inputContainer}>
                            <CustomInput 
                                placeholder="Nom du projet" 
                                value={name} 
                                onChangeText={setName} 
                            />
                            <CustomInput 
                                placeholder="Localisation du bien" 
                                value={location} 
                                onChangeText={setLocation} 
                            />
                            <CustomInput 
                                placeholder="Budget" 
                                value={budget} 
                                onChangeText={setBudget} 
                                validationRegex={/^\d+(\.\d{1,2})?$/} // Ajout de la validation pour le budget
                                suffix="€" // Ajout du suffixe pour la devise
                            />
                        </View>
                    </ScrollView>
                    <View style={styles.buttonContainer}>
                        <FilledButton 
                            text='Enregistrer' 
                            background={MyLightTheme.colors.deepGreen} 
                            full={true}
                            onPress={handleNext}
                            style={styles.filledButton} // Assurez-vous d'utiliser ce style
                        /> 
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <ProjectIconSelectorModal 
                isShow={isModalVisible} 
                toggleModal={toggleModal} 
                onSelectImage={handleImageSelect} 
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        width: "100%"
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        width: "100%",
    },
    container: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingBottom: 20,
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        position: 'relative',
        marginBottom: 30,
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        position: 'absolute', 
        left: 25, 
        top: '50%', 
        marginTop: -25, 
    },
    ProjectPictureWrapper: {
        marginTop: 10,
        marginBottom: 10,
    },
    pictureWrapper: {
        borderWidth: 1,
        borderColor: 'rgba(41, 157, 142, 1)',
        backgroundColor: 'rgba(217, 217, 217, 1)',
        borderRadius: 70, 
        overflow: 'hidden', 
    },
    picture: {
        width: 140,
        height: 140,
        borderRadius: 70,
    },
    inputContainer: {
        width: '100%',
        paddingHorizontal: 20,
        alignItems: 'center',
        flexGrow: 1,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    filledButton: {
        marginVertical: 10,
        width: '80%',  
        alignSelf: 'center',
    },
    
});

export default NewProjectScreen;
