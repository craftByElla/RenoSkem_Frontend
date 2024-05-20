import React from 'react';
import { StyleSheet, Text, View, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import BackButton from "../../components/buttons/BackButton";
import TwoStep from "../../components/progressIndicator/TwoStep";
import ScreenTitle from "../../components/text/ScreenTitle";
import UserPicture from "../../components/images/UserPicture";
import CustomInput from "../../components/inputs/CustomInput";

function CreateAccount({ navigation }) {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <BackButton 
                    style={styles.BackButton}
                    onPress={() => navigation.navigate('ConnectionScreen')}
                />
                <TwoStep step={2} /> 
                <ScreenTitle text="Create Account" />
                <UserPicture />
                <CustomInput placeholder="Prénom" />
                <CustomInput placeholder="Email" />
                <CustomInput placeholder="Mot de passe" secureTextEntry={true} />
                <Text 
                    style={styles.subtitle}
                    onPress={() => navigation.navigate('SetSkills')}
                >
                    Go to setSkills
                </Text>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default CreateAccount;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#EFECEA',
        paddingTop: 50, // Ajout de padding pour un meilleur espacement en haut
    },
    backButton: {
        position: 'absolute',
        top: 40, // Ajustez selon vos besoins pour un meilleur espacement en haut
        left: 20, // Ajustez selon vos besoins pour un meilleur espacement à gauche
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20, // Ajout de marge pour espacer du bouton
        color: 'black',
    },
});
