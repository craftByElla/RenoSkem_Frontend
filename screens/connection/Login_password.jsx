import React, { useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, SafeAreaView, ScrollView, Platform, Text, TouchableOpacity } from 'react-native';
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

function Login_password({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        // Vérification simple des champs
        if (!email || !password) {
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: 'Tous les champs sont obligatoires'
            });
            return;
        }

        const userData = {
            email,
            password
        };

        try {
            const response = await fetch('http://192.168.100.227:3000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (response.status === 200) {
                // Stocker le token JWT dans AsyncStorage
                await AsyncStorage.setItem('userToken', data.token);
                await AsyncStorage.setItem('userName', data.name);

                Toast.show({
                    type: 'success',
                    text1: 'Succès',
                    text2: 'Connexion réussie'
                });
                navigation.navigate('TabNavigator', { screen: 'Accueil', params: { screen: 'HomeScreen' } });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Erreur',
                    text2: data.message
                });
            }
        } catch (error) {
            console.error('Error:', error);
            Toast.show({
                type: 'error',
                text1: 'Erreur',
                text2: 'Une erreur est survenue lors de la connexion'
            });
        }
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
                        <ScreenTitle style={styles.ScreenTitle} text="Entrez votre mot de passe" />
                        <View style={styles.input}>
                            <CustomInput 
                                placeholder="Email" 
                                validationRegex={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
                                value={email}
                                onChangeText={setEmail} 
                            />
                            <CustomInput 
                                placeholder="Mot de passe" 
                                secureTextEntry={true}
                                value={password}
                                onChangeText={setPassword} 
                            />
                            <View style={styles.forgotPasswordContainer}>
                                <TouchableOpacity onPress={() => console.log('clic sur mot de passe oublié')}>
                                    <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            <FilledButton 
                                text='Se connecter' 
                                background={MyLightTheme.colors.deepGreen} 
                                full={true}
                                onPress={handleLogin}
                            /> 
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default Login_password;

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
    input: {
        flexGrow: 1, // Permettre à la section de grandir pour occuper l'espace disponible
    },
    forgotPasswordContainer: {
        width: "90%",
        alignSelf: 'flex-end', // Align the container to the right
        marginTop: -10, // Ajustez cette valeur pour l'espacement souhaité
    },
    forgotPasswordText: {
        color: '#E56F52',
        textAlign: 'right',
        fontFamily: 'Inter',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 21, // 175%
        letterSpacing: 0.25,
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
