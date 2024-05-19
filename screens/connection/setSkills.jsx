import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BackButton from "../../components/buttons/BackButton";

function SetSkills({ navigation }) {
    return (
        <View style={styles.main}>
            <Text>Set Skills</Text>
            <BackButton onPress={() => navigation.navigate('CreateAccount')}/>
        </View>
    );
}

export default SetSkills;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '',
        paddingTop: 20, // Ajout de padding pour un meilleur espacement en haut
    },
});
