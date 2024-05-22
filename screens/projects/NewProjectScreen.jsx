import React, { useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, SafeAreaView, Platform, TouchableOpacity, Image } from 'react-native';
import IconButton from "../../components/buttons/IconButton";
import ScreenTitle from "../../components/text/ScreenTitle";
import ProjectPicture from "../../components/images/ProjectPicture";
import CustomInput from "../../components/inputs/CustomInput";
import LogoTransparent from '../../components/logos/LogoTransparent';
import FilledButton from '../../components/buttons/FilledButton';
import { MyLightTheme } from '../../components/Theme';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProjectIconSelectorModal from '../../components/modal/ProjectIconSelectorModal';
const ipString = process.env.IP_ADDRESS;

function NewProjectScreen({ navigation }) {
    const [name, setName] = useState('');
    const [budget, setBudget] = useState('');
    const [location, setLocation] = useState('');
    const [avatar, setAvatar] = useState(null); 
    const [isModalVisible, setModalVisible] = useState(false); 

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleNext = () => {
        if (!name || !location || !budget) {
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: 'Tous les champs sont obligatoires'
            });
            return;
        }
    
        const userData = {
            name,
            location,
            budget,
            avatar: avatar ? avatar.uri : null
        };
    
        console.log('Données utilisateur envoyées :', userData);

        fetch(`${ipString}/users/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
        .then(async response => {
            const data = await response.json();
            if (data.message) {
                if (data.message === 'User successfully registered') {
                    await AsyncStorage.setItem('userToken', data.user.token);
                    await AsyncStorage.setItem('userId', data.user._id);

                    setName('');
                    setLocation('');
                    setBudget('');
                    setAvatar(null); 
                    Toast.show({
                        type: 'success',
                        text1: 'Succès',
                        text2: 'Compte créé avec succès'
                    });
                    navigation.navigate('SetSkills');
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
            console.error('Error:', error);
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: 'Une erreur est survenue'
            });
        });
    };

    const handleImageSelect = (image) => {
        console.log('Image sélectionnée :', image);
        setAvatar(image);
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
                            <ScreenTitle style={styles.ScreenTitle} text="Créer un nouveau projet" />
                        </View>
                        <View style={styles.UserPictureWrapper}>
                            <TouchableOpacity onPress={toggleModal}>
                                <View style={styles.avatarWrapper}>
                                    {avatar ? (
                                        <Image source={avatar} style={styles.avatar} />
                                    ) : (
                                        <ProjectPicture />
                                    )}
                                </View>
                            </TouchableOpacity>
                        </View>
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
                            />
                        </View>
                        <View style={styles.vide}>

                        </View>
                        <View style={styles.buttonContainer}>
                            <FilledButton 
                                text='Enregistrer' 
                                background={MyLightTheme.colors.deepGreen} 
                                full={true}
                                onPress={handleNext}
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
    UserPictureWrapper: {
        marginTop: 10,
        marginBottom: 10,
    },
    avatarWrapper: {
        borderWidth: 1,
        borderColor: 'rgba(41, 157, 142, 1)',
        backgroundColor: 'rgba(217, 217, 217, 1)',
        borderRadius: 70, // Assurez-vous que la bordure soit toujours ronde
        overflow: 'hidden', // Assurez-vous que l'image soit coupée aux bords
    },
    avatar: {
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
        width: "100%",
        alignItems: 'center',
        
    },
    vide : {
        height: 200,
        backgroundColor: "red" ,
    }
});

export default NewProjectScreen;
