import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, SafeAreaView, ScrollView, Platform, Text, TouchableOpacity } from 'react-native';
import IconButton from "../../components/buttons/IconButton";
import TwoStep from "../../components/progressIndicator/TwoStep";
import ScreenTitle from "../../components/text/ScreenTitle";
import LogoTransparent from '../../components/logos/LogoTransparent';
import FilledButton from '../../components/buttons/FilledButton';
import CustomInput from '../../components/inputs/CustomInput';
import { MyLightTheme } from '../../components/Theme';

function Login_Id({ navigation }) {
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
                                iconName="long-arrow-left"
                            />
                            <LogoTransparent />
                        </View>
                        <View style={styles.progressIndicatorWrapper}>
                            <TwoStep step={1} /> 
                        </View>
                        <ScreenTitle style={styles.ScreenTitle} text="Pour commencer, entrez votre adresse email" />
                        <View style={styles.input}>
                            <CustomInput 
                                placeholder="Email" 
                                validationRegex={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
                            />
                            <View style={styles.forgotPasswordContainer}>
                                <TouchableOpacity onPress={() => console.log('clic sur mot de passe oublié')}>
                                    <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            <FilledButton 
                                text='Suivant' 
                                background={MyLightTheme.colors.deepGreen} 
                                full={false}
                                onPress={() => navigation.navigate('Login_password')}
                            /> 
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default Login_Id;

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

