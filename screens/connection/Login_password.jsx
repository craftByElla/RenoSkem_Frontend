import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BackButton from "../../components/buttons/BackButton";

function Login_password({ navigation }) {
    return (
        <View style={styles.main}>
         <BackButton 
             style={styles.BackButton}
             onPress={() => navigation.navigate('Login_Id')}
         />
         <Text style={styles.title}>Login_password</Text>
         <Text 
             style={styles.title}
             onPress={() => navigation.navigate('TabNavigator')}
         >
             Go to HomeScreen
         </Text>
     </View>
    );
}

export default Login_password;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'purple',
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
