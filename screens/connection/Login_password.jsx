import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BackButton from "../../components/buttons/BackButton";

function Login_password({ navigation }) {
    return (
        <View style={styles.main}>
            <Text>Login_password</Text>
            <BackButton onPress={() => navigation.navigate('Login_Id')}/>
        </View>
    );
}

export default Login_password;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '',
        paddingTop: 20, // Ajout de padding pour un meilleur espacement en haut
    },
});
