import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BackButton from "../../components/buttons/BackButton";

function CreateAccount({ navigation }) {
    return (
        <View style={styles.main}>
            <BackButton 
                style={styles.BackButton}
                onPress={() => navigation.navigate('ConnectionScreen')}
            />
            <Text style={styles.title}>Create Account</Text>
            <Text 
                style={styles.title}
                onPress={() => navigation.navigate('SetSkills')}
            >
                Go to setSkills
            </Text>
        </View>
    );
}

export default CreateAccount;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'pink',
        paddingTop: 20, // Ajout de padding pour un meilleur espacement en haut
    },
    BackButton: {
        marginTop: 200,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20, // Ajout de marge pour espacer du bouton
        color: 'black',
    },
});
