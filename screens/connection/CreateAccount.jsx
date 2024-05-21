import React, { useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, SafeAreaView, ScrollView, Platform } from 'react-native';
import IconButton from "../../components/buttons/IconButton";
import TwoStep from "../../components/progressIndicator/TwoStep";
import ScreenTitle from "../../components/text/ScreenTitle";
import UserPicture from "../../components/images/UserPicture";
import CustomInput from "../../components/inputs/CustomInput";
import LogoTransparent from '../../components/logos/LogoTransparent';
import FilledButton from '../../components/buttons/FilledButton';
import { MyLightTheme } from '../../components/Theme';
import Toast from 'react-native-toast-message';

function CreateAccount({ navigation }) {

    //---------CONNEXION AU BACK------------------//
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleNext = () => {
        // Vérification simple des champs 
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
            password
        };
    
        // Envoi des données au serveur via fetch
        fetch('http://192.168.100.227:3000/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
        .then(response => response.json())
        .then(data => {
            // Gérer la réponse du serveur
            if (data.message) {
                if (data.message === 'User successfully registered') {
                    // Réinitialiser les champs d'entrée
                    setName('');
                    setEmail('');
                    setPassword('');
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
    


    //----------VISUEL FRONT--------------//

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
                            <UserPicture />
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
        </SafeAreaView>
    );
}

export default CreateAccount;

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
    input : {
        flexGrow: 1, // Permettre à la section de grandir pour occuper l'espace disponible
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
