
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import { useTheme } from '@react-navigation/native';

function Project(props) {
    const { colors } = useTheme();

    const styles = createStyles(colors);

    return (
        <View style={styles.projectContainer}>
            <Image />                                            {/* Composant Image pour afficher une image*/}
            <Text style={styles.title}>Projet</Text>
            <Text style={styles.projectName}>{props.name}</Text>   {/* Composant Text pour afficher le nom du projet, en utilisant la prop 'name' passée au composant parent */}
        </View>
    )
}

export default Project;

const createStyles = (colors) => StyleSheet.create({
    projectContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 125,
        width: 100,
        borderRadius: 10,
        backgroundColor: colors.modalBackgroundColor,
    },
    title: {
        color: colors.deepGrey,
        letterSpacing: 0.5,
        lineHeight: 19,
    }, 
    projectName: {
        fontWeight: 'bold',
        color: colors.deepGrey,
        letterSpacing: 0.5,
        lineHeight: 19 
    }
})


