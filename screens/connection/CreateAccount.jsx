import React from 'react';
import { StyleSheet, Text, View, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import IconButton from "../../components/buttons/IconButton";
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
                    <IconButton
                        style={styles.iconButton}
                        onPress={() => navigation.navigate('ConnectionScreen')}
                        iconName="arrow-left"
                    />
                    <LogoTransparent />
                    <TwoStep step={2} /> 
                    <ScreenTitle text="Create Account" />
                    <UserPicture />
                    <CustomInput placeholder="Prénom" />
                    <CustomInput placeholder="Email" />
                    <CustomInput placeholder="Mot de passe" secureTextEntry={true} />
                    <CustomInput placeholder="Rechercher ici" search={true} />
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
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#EFECEA',
    },
    iconButtonButton: {
        position: 'absolute',
        top: 40, 
        left: 20, 
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20, // Add margin for spacing
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
