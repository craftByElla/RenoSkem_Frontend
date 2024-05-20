import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, SafeAreaView, ScrollView, Platform } from 'react-native';
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
    },
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20, // Ajoutez du padding horizontal pour éviter que le clavier couvre les inputs
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
    buttonContainer: {
        width: "100%",
        alignItems: 'center',
        marginVertical: 20,
    },
    filledButton: {
        marginVertical: 10, 
    }
});
