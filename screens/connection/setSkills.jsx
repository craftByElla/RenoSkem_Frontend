import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import IconButton from "../../components/buttons/IconButton";

function SetSkills({ navigation }) {
    return (
    <View style={styles.main}>
         <IconButton
                        style={styles.iconButton}
                        onPress={() => navigation.navigate('ConnectionScreen')}
                        iconName="arrow-left"
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
    iconButton: {
        marginTop: 200,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20, // Ajout de marge pour espacer du bouton
        color: 'black',
    },
});
