import React, { useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, SafeAreaView, ScrollView, Platform, TouchableOpacity, Image } from 'react-native';
import IconButton from "../../components/buttons/IconButton";
import TwoStep from "../../components/progressIndicator/TwoStep";
import ScreenTitle from "../../components/text/ScreenTitle";
import UserPicture from "../../components/images/UserPicture";
import CustomInput from "../../components/inputs/CustomInput";
import LogoTransparent from '../../components/logos/LogoTransparent';
import FilledButton from '../../components/buttons/FilledButton';
import { MyLightTheme } from '../../components/Theme';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageSelectorModal from '../../components/modal/ImageSelectorModal';

function CreateAccount({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState(null); 
    const [isModalVisible, setModalVisible] = useState(false); 

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleNext = () => {
        if (!name || !email || !password) {
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: 'Tous les champs sont obligatoires'
            });
            return;
        }
    
        const userData = {
            name,
            email,
            password,
            avatar: avatar ? avatar.uri : null
        };
    
        console.log('Données utilisateur envoyées :', userData);

        fetch('http://192.168.100.227:3000/users/signup', {
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
                    setEmail('');
                    setPassword('');
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
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
                keyboardVerticalOffset={20}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <View style={styles.header}>
                            <IconButton
                                style={styles.iconButton}
                                onPress={() => navigation.navigate('ConnectionScreen')}
                                iconName="arrow-left"
                            />
                            <LogoTransparent />
                        </View>
                        <View style={styles.progressIndicatorWrapper}>
                            <TwoStep step={1} /> 
                        </View>
                        <ScreenTitle style={styles.ScreenTitle} text="Créer votre compte" />
                        <View style={styles.UserPictureWrapper}>
                            <TouchableOpacity onPress={toggleModal}>
                                <View style={styles.avatarWrapper}>
                                    {avatar ? (
                                        <Image source={avatar} style={styles.avatar} />
                                    ) : (
                                        <UserPicture />
                                    )}
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.input}>
                            <CustomInput 
                                placeholder="Prénom" 
                                value={name} 
                                onChangeText={setName} 
                            />
                            <CustomInput 
                                placeholder="Email" 
                                value={email} 
                                onChangeText={setEmail}
                                validationRegex={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i} 
                                keyboardType="email-address" 
                                autoCapitalize="none"
                            />
                            <CustomInput 
                                placeholder="Mot de passe" 
                                secureTextEntry={true} 
                                value={password}
                                onChangeText={setPassword}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <FilledButton 
                                text='Suivant' 
                                background={MyLightTheme.colors.deepGreen} 
                                full={false}
                                onPress={handleNext}
                            /> 
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            <ImageSelectorModal 
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
    scrollContainer: {
        flexGrow: 1,
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
    input: {
        flexGrow: 1,
    },
    buttonContainer: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: "10%",
    },
    filledButton: {
        marginVertical: 10, 
    }
});

export default CreateAccount;
