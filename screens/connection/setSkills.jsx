import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BackButton from "../../components/buttons/BackButton";

function SetSkills({ navigation }) {
    return (
    <View style={styles.main}>
         <BackButton 
             style={styles.BackButton}
             onPress={() => navigation.navigate('CreateAccount')}
         />
         <Text style={styles.title}>Set Skills</Text>
         <Text 
             style={styles.title}
             onPress={() => navigation.navigate('TabNavigator')}
         >
             Go to HomeScreen
         </Text>
     </View>
    );
}

export default SetSkills;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'green',
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
