import React from 'react';
import { StyleSheet, Text, View, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import BackButton from "../../components/buttons/BackButton";
import TwoStep from "../../components/progressIndicator/TwoStep";
import ScreenTitle from "../../components/text/ScreenTitle";
import UserPicture from "../../components/images/UserPicture";
import CustomInput from "../../components/inputs/CustomInput";
import LogoTransparent from '../../components/logos/LogoTransparent';

function CreateAccount({ navigation }) {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.main}>
                    <BackButton 
                        style={styles.backButton}
                        onPress={() => navigation.navigate('ConnectionScreen')}
                    />
                    <LogoTransparent />
                    <TwoStep step={2} /> 
                    <ScreenTitle text="Create Account" />
                    <UserPicture />
                    <CustomInput placeholder="Prénom" />
                    <CustomInput placeholder="Email" />
                    <CustomInput placeholder="Mot de passe" secureTextEntry={true} />
                    <CustomInput placeholder="Search here" search={true} />
                    <Text 
                        style={styles.subtitle}
                        onPress={() => navigation.navigate('SetSkills')}
                    >
                        Go to setSkills
                    </Text>
                    <View style={styles.buttonContainer}>
                        
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

export default CreateAccount;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    main: {
        flex: 1,
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
        backgroundColor: '#EFECEA',
    },
    backButton: {
        position: 'absolute',
        top: 40, // Adjust as needed for better top spacing
        left: 20, // Adjust as needed for better left spacing
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20, // Add margin for spacing
        color: 'black',
    },
    buttonContainer: {
        width: '100%', // Take full width of the parent container
        justifyContent: 'center', // Center vertically within the container
        alignItems: 'center', // Center horizontally within the container
        marginTop: 20, // Add margin to separate from other elements
    },
    filledButton: {
        marginVertical: 10, // Add space between buttons
    }
});
