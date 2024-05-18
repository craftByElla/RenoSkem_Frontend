import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import { useTheme } from '@react-navigation/native';

function HomeScreen(props) {
    const { colors } = useTheme();

    const styles = createStyles(colors);

    return (
        <View style={styles.projectContainer}>
            <Image />
            <Text style={styles.title}>Projet</Text>
            <Text style={styles.projectName}>{props.name}</Text>
        </View>
    )
}

export default HomeScreen;

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


