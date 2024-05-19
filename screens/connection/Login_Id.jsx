import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BackButton from "../../components/buttons/BackButton";

function Login_Id({ navigation }) {
    return (
        <View style={styles.main}>
            <Text>Login_Id</Text>
            <BackButton onPress={() => navigation.navigate('ConnectionScreen')}/>
        </View>
    );
}

export default Login_Id;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '',
        paddingTop: 20, // Ajout de padding pour un meilleur espacement en haut
    },
});
