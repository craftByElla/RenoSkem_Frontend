import React from 'react';
import { StyleSheet, View, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, SafeAreaView } from 'react-native';
import IconButton from "../../components/buttons/IconButton";
import TwoStep from "../../components/progressIndicator/TwoStep";
import ScreenTitle from "../../components/text/ScreenTitle";
import UserPicture from "../../components/images/UserPicture";
import CustomInput from "../../components/inputs/CustomInput";
import LogoTransparent from '../../components/logos/LogoTransparent';
import FilledButton from '../../components/buttons/FilledButton';
import { MyLightTheme } from '../../components/Theme';

function CreateAccount({ navigation }) {
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
                                onPress={() => navigation.navigate('ConnectionScreen')}
                                iconName="arrow-left"
                            />
                            <View style={styles.logoWrapper}>
                                <LogoTransparent />
                            </View>
                        </View>
                        <TwoStep step={2} /> 
                        <ScreenTitle text="Create Account" />
                        <UserPicture />
                        <CustomInput placeholder="Prénom" />
                        <CustomInput placeholder="Email" />
                        <CustomInput placeholder="Mot de passe" secureTextEntry={true} />
                        <View style={styles.buttonContainer}>
                            <FilledButton 
                                text='Suivant' 
                                background={MyLightTheme.colors.deepGreen} 
                                full={false}
                                onPress={() => navigation.navigate('SetSkills')}
                            /> 
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default CreateAccount;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#EFECEA',
    },
    container: {
        flex: 1,
    },
    main: {
        flex: 1,
        justifyContent: 'flex-start', // Aligner les éléments en haut
        alignItems: 'center',
        backgroundColor: '#EFECEA',
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
    logoWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'black',
    },
    buttonContainer: {
        width: '100%', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 20, 
    },
    filledButton: {
        marginVertical: 10, 
    }
});
