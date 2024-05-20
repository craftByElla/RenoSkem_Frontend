import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BackButton from "../../components/buttons/BackButton";

function Login_Id({ navigation }) {
    return (
         <View style={styles.main}>
         <BackButton 
             style={styles.BackButton}
             onPress={() => navigation.navigate('ConnectionScreen')}
         />
         <Text style={styles.title}>Login_Id</Text>
         <Text 
             style={styles.title}
             onPress={() => navigation.navigate('Login_password')}
         >
             Go to Login_password
         </Text>
     </View>
    );
}

export default Login_Id;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'yellow',
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
